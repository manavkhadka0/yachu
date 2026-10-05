"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Phone, MapPin, Send, Loader2 } from "lucide-react";
import posthog from "posthog-js";
import { toast } from "sonner";

import { Form } from "@/components/ui/form";
import { contactFormSchema } from "@/schemas/order.schemas";
import RHFInput from "@/components/react-hook-form/RHFInput";
import RHFTextarea from "@/components/react-hook-form/RHFTextarea";
import { useCreateContact } from "@/hooks/use-contact";

export function Contact() {
  const createContactMutation = useCreateContact();

  const form = useForm({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      await createContactMutation.mutateAsync({
        full_name: data.name,
        email: data.email,
        phone: data.phone,
        message: data.message,
      });

      try {
        posthog.capture("contact_form_submitted", {
          has_message: !!data.message,
        });

        if (data.email) {
          posthog.identify(data.email, {
            name: data.name,
            email: data.email,
            phone: data.phone,
          });
        }
      } catch (phError) {
        console.warn("PostHog tracking failed:", phError);
      }

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
      className="relative py-24 md:py-32 bg-gradient-to-br from-card via-background to-[oklch(0.95_0.04_145)]"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="md:text-center mb-14">
          <p className="font-script text-2xl text-gold mb-2">Talk to us</p>
          <h2 className="text-4xl md:text-6xl text-forest">Contact Yachu</h2>
          <p className="mt-4 text-foreground/65 max-w-xl mx-auto">
            A question, a story, or a hair concern — we read every message.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-8">
          {/* Info */}
          <div className="space-y-4">
            {[
              { Icon: Mail, label: "Email us", v: "yachusales@gmail.com" },
              { Icon: Phone, label: "Call us", v: "+977 9709066929" },
              {
                Icon: MapPin,
                label: "Visit us",
                v: "Sankhamul, Lalitpur",
              },
            ].map(({ Icon, label, v }) => (
              <div
                key={label}
                className="flex items-start gap-4 p-5 rounded-2xl bg-card border border-border hover:border-forest/30 transition-colors"
              >
                <span className="w-12 h-12 rounded-full bg-forest/10 flex items-center justify-center text-forest shrink-0">
                  <Icon className="w-5 h-5" />
                </span>
                <div>
                  <div className="text-xs uppercase tracking-widest text-foreground/55">
                    {label}
                  </div>
                  <div className="text-forest font-medium mt-0.5">{v}</div>
                </div>
              </div>
            ))}
            <div className="p-5 rounded-2xl bg-forest text-cream">
              <p className="font-script text-2xl text-gold">Open hours</p>
              <p className="mt-2 text-cream/85 text-sm">
                Sun – Fri · 9 am – 6 pm NPT
                <br />
                Replies within 24 hours
              </p>
            </div>
          </div>

          {/* Form */}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="p-7 md:p-9 rounded-3xl bg-card border border-border space-y-5"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <RHFInput
                  name="name"
                  label="Your name"
                  placeholder="Anjali Sharma"
                  required
                  disabled={isSubmitting}
                />
                <RHFInput
                  name="email"
                  label="Your email"
                  type="email"
                  placeholder="you@email.com"
                  disabled={isSubmitting}
                />
              </div>
              <RHFInput
                name="phone"
                label="Phone Number"
                placeholder="eg. 9800000000"
                type="text"
                required
                disabled={isSubmitting}
              />
              <RHFTextarea
                name="message"
                label="Your message"
                rows={5}
                placeholder="Tell us how we can help…"
                required
                disabled={isSubmitting}
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-3.5 rounded-full bg-forest text-cream font-medium hover:bg-forest/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    Sending... <Loader2 className="w-4 h-4 animate-spin" />
                  </>
                ) : (
                  <>
                    Send message <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
}
