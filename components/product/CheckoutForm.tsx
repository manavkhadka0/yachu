"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { Form } from "../ui/form";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { checkoutFormSchema } from "@/types/zod.schema";
import RHFInput from "../react-hook-form/RHFInput";
import RHFTextarea from "../react-hook-form/RHFTextarea";
import { useToast } from "../ui/use-toast";
import emailjs from "@emailjs/browser";
import useProductCart from "@/store/zustand";
import { calculateTotalPrice } from "@/lib/utils";

const CheckoutForm = () => {
  const { cart } = useProductCart();

  const form = useForm<z.infer<typeof checkoutFormSchema>>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
    },
  });

  const { toast } = useToast();

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const orderInput = {
      customer: data,
      cart,
      totalCost: `Rs. ${calculateTotalPrice(cart)}`,
    };

    window.alert(JSON.stringify(orderInput));

    // emailjs
    //   .send("service_57mk83w", "template_uckwqs9", data, "HkRr4Zmamy8axmFd5")
    //   .then((result) => {
    //     toast({
    //       title: "Proposal for franchise submitted",
    //       description: "We will contact you soon.",
    //     });
    //   })
    //   .catch((error) => {
    //     toast({
    //       title: "Error submitting proposal",
    //       description: "We are getting some error. Please try again.",
    //     });
    //   });
    reset();
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
          name="address"
          label="Delivery Address"
          rows={5}
          placeholder="eg. New baneshwor - 10, Kathmandu"
          className="text-base py-4 "
          required
        />
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full  sm:text-lg p-6 bg-amber-700 hover:bg-amber-800  transition-all"
        >
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Confirm order
        </Button>
      </form>
    </Form>
  );
};

export default CheckoutForm;
