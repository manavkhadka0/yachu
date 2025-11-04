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
import useProductCart from "@/store/zustand";
import { calculateTotalPrice } from "@/services/lib/utils";
import { useState } from "react";
import { Alert, AlertDescription } from "../ui/alert";
import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";
import { cn } from "@/lib/utils";
import { useCreateOrder } from "@/hooks/use-orders";
import { TCreateOrderRequest } from "@/types/order";
import { useRouter } from "next/navigation";

interface CheckoutFormProps {
  onSuccess?: () => void;
  onCloseSheet?: () => void;
  className?: string;
}

const CheckoutForm = ({
  onSuccess,
  onCloseSheet,
  className,
}: CheckoutFormProps) => {
  const { cart, clearCart } = useProductCart();
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderId, setOrderId] = useState<number | null>(null);
  const createOrderMutation = useCreateOrder();
  const router = useRouter();

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

  const { handleSubmit, reset } = form;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const orderData: TCreateOrderRequest = {
      full_name: data.name,
      email: data.email || null,
      phone_number: data.phone,
      alternate_phone_number: data.alternate_phone || null,
      delivery_address: data.address,
      payment_method: "Cash on Delivery",
      total_amount: calculateTotalPrice(cart),
      order_products: cart.map((item) => ({
        product_id: Number(item.product.id),
        quantity: item.count,
      })),
      remarks: data.remarks || null,
    };

    try {
      const response = await createOrderMutation.mutateAsync(orderData);

      // Clear cart and reset form on success
      clearCart();
      reset();
      setIsSuccess(true);
      setOrderId(response.id);

      // Redirect to order details page after 2 seconds
      setTimeout(() => {
        onCloseSheet?.();
        router.push(`/orders/${response.id}`);
        onSuccess?.();
      }, 2000);
    } catch (error) {
      // Error handling is done in the mutation hook
      console.error("Order submission failed:", error);
    }
  };

  if (isSuccess) {
    return (
      <Card className={cn("border-0 shadow-none", className)}>
        <CardContent className="flex flex-col items-center justify-center py-12 px-4 space-y-6 text-center">
          <div className="rounded-full bg-success/10 p-3 border border-success/20">
            <CheckCircle2 className="h-12 w-12 text-success" />
          </div>
          <div className="space-y-2">
            <CardTitle className="text-2xl text-foreground">
              Order Placed Successfully!
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Thank you for your order. Redirecting you to order details...
            </CardDescription>
            {orderId && (
              <p className="text-sm text-muted-foreground">
                Order ID: #{orderId}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  const isSubmitting = createOrderMutation.isPending;

  return (
    <Card className={cn("border-0 shadow-none flex flex-col h-full", className)}>
      <CardContent className="p-0 flex flex-col flex-1 min-h-0">
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full">
            {/* Scrollable content area */}
            <div className="flex-1 overflow-y-auto space-y-8 pr-2">
              <Alert className="border-l-4 border-l-warning bg-warning/5 border-warning/20">
                <Info className="h-5 w-5 text-warning" />
                <AlertDescription className="text-foreground">
                  Delivery charge: Rs. 100 for inside Kathmandu Valley, Rs. 150
                  for outside Kathmandu Valley
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                <RHFInput
                  name="name"
                  label="Full Name"
                  placeholder="eg. John Doe"
                  required
                  className="text-base"
                  disabled={isSubmitting}
                />

                <div className="grid sm:grid-cols-2 gap-4">
                  <RHFInput
                    name="phone"
                    label="Phone Number"
                    placeholder="eg. 9865436650"
                    type="tel"
                    className="text-base"
                    required
                    disabled={isSubmitting}
                  />
                  <RHFInput
                    name="alternate_phone"
                    label="Alternate Phone Number (Optional)"
                    placeholder="eg. 9865436651"
                    type="tel"
                    className="text-base"
                    disabled={isSubmitting}
                  />
                </div>

                <RHFInput
                  name="email"
                  label="Email Address (Optional)"
                  placeholder="eg. john@gmail.com"
                  type="email"
                  className="text-base"
                  disabled={isSubmitting}
                />

                <RHFTextarea
                  name="address"
                  label="Delivery Address"
                  rows={3}
                  placeholder="eg. New baneshwor - 10, Kathmandu"
                  className="text-base"
                  required
                  disabled={isSubmitting}
                />

                <RHFTextarea
                  name="remarks"
                  label="Remarks (Optional)"
                  rows={2}
                  placeholder="Any special instructions or notes for your order"
                  className="text-base"
                  disabled={isSubmitting}
                />
              </div>
            </div>

            {/* Sticky button at the bottom */}
            <div className="sticky bottom-0 pt-6 pb-2 bg-background border-t mt-6">
              <Button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "w-full sm:text-lg p-6 transition-all relative",
                  isSubmitting && "animate-pulse"
                )}
                variant="default"
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
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CheckoutForm;