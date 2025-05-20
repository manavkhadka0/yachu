"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { Form } from "../ui/form";
import { Button } from "../ui/button";
import { Loader2, Info, CheckCircle2 } from "lucide-react";
import { checkoutFormSchema } from "@/types/zod.schema";
import RHFInput from "../react-hook-form/RHFInput";
import RHFTextarea from "../react-hook-form/RHFTextarea";
import { useToast } from "../ui/use-toast";
import useProductCart from "@/store/zustand";
import { calculateTotalPrice } from "@/lib/utils";
import { useState } from "react";
import { Alert, AlertDescription } from "../ui/alert";

interface CheckoutFormProps {
  onSuccess?: () => void;
  onCloseSheet?: () => void;
}

const CheckoutForm = ({ onSuccess, onCloseSheet }: CheckoutFormProps) => {
  const { cart, clearCart } = useProductCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<z.infer<typeof checkoutFormSchema>>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      alternate_phone: "",
      address: "",
      remarks: "",
    },
  });

  const { toast } = useToast();

  const {
    handleSubmit,
    reset,
    formState: { isLoading },
  } = form;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsSubmitting(true);

    const orderData = {
      full_name: data.name,
      email: data.email || null,
      phone_number: data.phone,
      alternate_phone_number: data.alternate_phone || null,
      delivery_address: data.address,
      payment_method: "Cash on Delivery",
      total_amount: calculateTotalPrice(cart),
      order_products: cart.map((item) => ({
        product_id: item.product.id,
        quantity: item.count,
      })),
      remarks: data.remarks || null,
    };

    try {
      const response = await fetch(
        "https://yachu.baliyoventures.com/api/orders/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit order");
      }

      clearCart();
      reset();
      setIsSuccess(true);

      // Close modal and sheet after 2 seconds
      setTimeout(() => {
        onSuccess?.();
        onCloseSheet?.();
      }, 2000);
    } catch (error) {
      toast({
        title: "Error submitting order",
        description:
          "There was a problem submitting your order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 space-y-6 text-center">
        <div className="rounded-full bg-green-100 p-3">
          <CheckCircle2 className="h-12 w-12 text-green-600" />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-semibold text-gray-900">
            Order Placed Successfully!
          </h3>
          <p className="text-gray-500">
            Thank you for your order. One of our representatives will contact
            you shortly to confirm your order details.
          </p>
        </div>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <Alert className="bg-amber-50 border-amber-200">
          <Info className="h-5 w-5 text-amber-600" />
          <AlertDescription className="text-amber-800">
            Delivery charge: Rs. 100 for inside Kathmandu Valley, Rs. 150 for
            outside Kathmandu Valley
          </AlertDescription>
        </Alert>

        <div className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <RHFInput
              name="name"
              label="name"
              placeholder="eg. John Doe"
              required
              className="text-base"
              disabled={isSubmitting}
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
              <RHFInput
                name="phone"
                label="Phone Number"
                placeholder="eg. 9865436650"
                type="tel"
                className="text-base"
                required
                disabled={isSubmitting}
              />
            </div>
            <div>
              <label
                htmlFor="alternate_phone"
                className="block text-sm font-medium text-gray-700"
              >
                Alternate Phone Number (Optional)
              </label>
              <RHFInput
                name="alternate_phone"
                label="Alternate Phone Number (Optional)"
                placeholder="eg. 9865436651"
                type="tel"
                className="text-base"
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address (Optional)
            </label>
            <RHFInput
              name="email"
              label="email"
              placeholder="eg. john@gmail.com"
              type="email"
              className="text-base"
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              Delivery Address
            </label>
            <RHFTextarea
              name="address"
              label="address"
              rows={3}
              placeholder="eg. New baneshwor - 10, Kathmandu"
              className="text-base"
              required
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label
              htmlFor="remarks"
              className="block text-sm font-medium text-gray-700"
            >
              Remarks (Optional)
            </label>
            <RHFTextarea
              label="remarks"
              name="remarks"
              rows={2}
              placeholder="Any special instructions or notes for your order"
              className="text-base"
              disabled={isSubmitting}
            />
          </div>
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className={`w-full sm:text-lg p-6 bg-amber-700 hover:bg-amber-800 transition-all relative ${
            isSubmitting ? "animate-pulse" : ""
          }`}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-6 w-6 animate-spin" />
              <span>Processing Order...</span>
            </>
          ) : (
            "Confirm Order"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default CheckoutForm;
