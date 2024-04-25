"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { contactFormSchema } from "@/types/zod.schema";
import RHFInput from "../react-hook-form/RHFInput";
import RHFTextarea from "../react-hook-form/RHFTextarea";

const ContactForm = () => {
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
    window.alert("message sent");
  };
  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className=" grid  sm:grid-cols-2 sm:gap-4 gap-8">
          <RHFInput
            name="name"
            label="Full Name"
            placeholder="eg. John Doe"
            required
            className="text-base"
          />
          <RHFInput
            name="phone"
            label="Phone Number"
            placeholder="eg. 986543665"
            type="number"
            className="text-base"
            required
          />
        </div>
        <RHFInput
          name="email"
          label="Email Address"
          placeholder="eg. john@gmail.com"
          type="email"
          required
          className="text-base"
        />

        <RHFTextarea
          name="message"
          label="Message"
          rows={5}
          placeholder="Write your message..."
          className="text-base py-4 "
        />
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full text-lg py-6 font-bold "
        >
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default ContactForm;
