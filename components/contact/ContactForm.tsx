"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { Form } from "../ui/form";
import { Button } from "../ui/button";
import { Loader2, Send } from "lucide-react";
import { contactFormSchema } from "@/types/zod.schema";
import RHFInput from "../react-hook-form/RHFInput";
import RHFTextarea from "../react-hook-form/RHFTextarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useToast } from "../ui/use-toast";

const ContactForm = () => {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      // TODO: Implement actual form submission
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you as soon as possible.",
      });
      form.reset();
    } catch (error) {
      toast({
        title: "Error sending message",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Contact Us</CardTitle>
        <CardDescription>
          Send us a message and we'll get back to you as soon as possible.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <RHFInput
                name="name"
                label="Name"
                placeholder="Full Name"
                required
                className="text-base transition-all duration-200 focus:scale-[1.01]"
              />
              <RHFInput
                name="phone"
                label="Phone Number"
                placeholder="Phone"
                type="number"
                className="text-base transition-all duration-200 focus:scale-[1.01]"
                required
              />
            </div>
            <RHFInput
              name="email"
              label="Email Address"
              placeholder="Your Email"
              type="email"
              required
              className="text-base transition-all duration-200 focus:scale-[1.01]"
            />

            <RHFTextarea
              name="message"
              label="Message"
              rows={5}
              placeholder="Write your message..."
              className="text-base transition-all duration-200 focus:scale-[1.01]"
            />
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full text-base py-6 font-semibold transition-all duration-200 hover:scale-[1.01]"
            >
              {isSubmitting ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                <Send className="mr-2 h-5 w-5" />
              )}
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ContactForm;
