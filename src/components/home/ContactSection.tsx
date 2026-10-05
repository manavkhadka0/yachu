"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import {
  Loader2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  type LucideIcon,
} from "lucide-react";
import posthog from "posthog-js";
import { toast } from "sonner";
import { Form } from "@/components/ui/form";
import { contactFormSchema } from "@/types/zod.schema";
import RHFInput from "@/components/react-hook-form/RHFInput";
import RHFTextarea from "@/components/react-hook-form/RHFTextarea";
import { useCreateContact } from "@/hooks/use-contact";
import { chibekoAddress, yachuEmail, yachuPhone } from "@/constants/constant";
import { whatsappOrderUrl } from "@/constants/offers";
import SectionHeading from "./SectionHeading";

const CHANNELS: { Icon: LucideIcon; label: string; value: string; href?: string }[] =
  [
    {
      Icon: Phone,
      label: "Call us",
      value: yachuPhone,
      href: `tel:${yachuPhone.replace(/\s/g, "")}`,
    },
    {
      Icon: MessageCircle,
      label: "WhatsApp",
      value: "Chat with us",
      href: whatsappOrderUrl,
    },
    {
      Icon: Mail,
      label: "Email us",
      value: yachuEmail,
      href: `mailto:${yachuEmail}`,
    },
    { Icon: MapPin, label: "Visit us", value: chibekoAddress },
  ];

const ContactSection = ({ as = "h2" }: { as?: "h1" | "h2" }) => {
  const createContactMutation = useCreateContact();

  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      await createContactMutation.mutateAsync({
        full_name: data.name,
        email: data.email,
        phone: data.phone,
        message: data.message,
      });

      posthog.capture("contact_form_submitted", {
        has_message: !!data.message,
      });

      toast.success("Message sent successfully!", {
        description: "We'll get back to you as soon as possible.",
      });
      form.reset();
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Error sending message", {
        description: "Please try again later.",
      });
    }
  };

  const isSubmitting = createContactMutation.isPending;

  return (
    <section
      id="contact"
      className="relative bg-gradient-to-br from-card via-background to-[oklch(0.95_0.04_145)] py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          as={as}
          eyebrow="Talk to us"
          title="Contact Yachu"
          description="A question, a story, or a hair concern — we read every message."
        />

        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          {/* Ways to reach us */}
          <div className="space-y-4">
            {CHANNELS.map(({ Icon, label, value, href }) => {
              const body = (
                <>
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-forest/10 text-forest">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-foreground/55">
                      {label}
                    </div>
                    <div className="mt-0.5 font-medium text-forest">{value}</div>
                  </div>
                </>
              );
              const cardClass =
                "flex items-center gap-4 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-forest/30";
              return href ? (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className={cardClass}
                >
                  {body}
                </a>
              ) : (
                <div key={label} className={cardClass}>
                  {body}
                </div>
              );
            })}
          </div>

          {/* Form */}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 rounded-3xl border border-border bg-card p-6 shadow-[0_25px_60px_-35px_oklch(0.32_0.07_150/0.45)] md:p-9"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <RHFInput
                  name="name"
                  label="Your name"
                  floatingLabel
                  required
                  autoComplete="name"
                  disabled={isSubmitting}
                />
                <RHFInput
                  name="phone"
                  label="Phone number"
                  floatingLabel
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel"
                  required
                  disabled={isSubmitting}
                />
              </div>
              <RHFInput
                name="email"
                label="Your email"
                floatingLabel
                type="email"
                autoComplete="email"
                required
                disabled={isSubmitting}
              />
              <RHFTextarea
                name="message"
                label="Your message"
                floatingLabel
                rows={5}
                required
                className="min-h-[140px]"
                disabled={isSubmitting}
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex h-13 w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-forest px-8 font-medium text-cream transition-colors hover:bg-forest/90 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
              >
                {isSubmitting ? (
                  <>
                    Sending... <Loader2 className="h-4 w-4 animate-spin" />
                  </>
                ) : (
                  <>
                    Send message <Send className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
