"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { verifyNPSTransaction, NPSVerifyResponse } from "@/services/api/nps";
import useProductCart from "@/store/zustand";
import { useCreateOrder } from "@/hooks/use-orders";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  XCircle,
  Loader2,
  ArrowRight,
  ShoppingBag,
  Receipt,
} from "lucide-react";
import posthog from "posthog-js";
import { toast } from "sonner";

export default function NPSCallbackContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { clearCart } = useProductCart();
  const createOrderMutation = useCreateOrder();

  const merchantTxnId =
    searchParams.get("MerchantTxnId") || searchParams.get("merchant_txn_id");

  const [loading, setLoading] = useState(true);
  const [txn, setTxn] = useState<NPSVerifyResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const isVerifyingRef = React.useRef(false);

  useEffect(() => {
    if (!merchantTxnId) {
      setError("Missing merchant transaction reference ID.");
      setLoading(false);
      return;
    }

    if (isVerifyingRef.current) return;
    isVerifyingRef.current = true;

    let customerName: string | undefined;
    let customerPhone: string | undefined;
    let savedCheckoutPayload: {
      name: string;
      email?: string | null;
      phone: string;
      alternate_phone?: string | null;
      address: string;
      remarks?: string | null;
      total_amount?: number;
      order_products?: { product_id: number; quantity: number }[];
    } | null = null;

    try {
      const savedCheckoutData = localStorage.getItem("nps_pending_checkout");
      if (savedCheckoutData) {
        const parsed = JSON.parse(savedCheckoutData);
        savedCheckoutPayload = parsed;
        customerName = parsed.name;
        customerPhone = parsed.phone;
      }
    } catch (e) {
      console.warn("Could not read pending checkout form from localStorage", e);
    }

    verifyNPSTransaction(merchantTxnId, customerName, customerPhone)
      .then(async (data) => {
        setTxn(data);

        if (
          data.status === "Success" ||
          data.status === "SUCCESS" ||
          data.status === "COMPLETED"
        ) {
          // Create the order on the backend if saved checkout data exists
          if (savedCheckoutPayload) {
            try {
              const orderPayload = {
                full_name: savedCheckoutPayload.name,
                email: savedCheckoutPayload.email || null,
                phone_number: savedCheckoutPayload.phone,
                alternate_phone_number:
                  savedCheckoutPayload.alternate_phone || null,
                delivery_address: savedCheckoutPayload.address,
                payment_method: "NPS / OnePG",
                payment_type: "NPS",
                total_amount:
                  Number(data.amount) || savedCheckoutPayload.total_amount || 0,
                order_products: savedCheckoutPayload.order_products || [],
                remarks: savedCheckoutPayload.remarks || null,
                transaction_id: data.merchant_txn_id || merchantTxnId,
                is_paid: true,
              };

              await createOrderMutation.mutateAsync(orderPayload);
            } catch (createErr) {
              console.error("Failed to create order post-payment:", createErr);
            }
          }

          // Clear cart & clear pending checkout details
          clearCart();
          localStorage.removeItem("nps_pending_checkout");

          toast.success("Payment successful! Order placed.");

          // Analytics tracking
          posthog.capture("nps_payment_success", {
            merchant_txn_id: data.merchant_txn_id,
            amount: data.amount,
            order_id: data.order,
          });
        } else {
          toast.error("Payment verification failed", {
            description: data.cbs_message || "Transaction was not successful.",
          });
        }
        setLoading(false);
      })
      .catch((err: unknown) => {
        const msg =
          err instanceof Error
            ? err.message
            : "Unable to verify payment status.";
        setError(msg);
        setLoading(false);
        toast.error("Verification error", { description: msg });
      });
  }, [merchantTxnId]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-4">
        <Card className="w-full max-w-md border-border/40 shadow-xl bg-card">
          <CardContent className="flex flex-col items-center justify-center p-8 text-center space-y-4">
            <div className="p-4 rounded-full bg-primary/10 text-primary animate-pulse">
              <Loader2 className="h-10 w-10 animate-spin" />
            </div>
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-foreground">
                Verifying Payment
              </h2>
              <p className="text-sm text-muted-foreground">
                Please wait while we confirm your transaction with Nepal Payment
                Solution...
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const isSuccess =
    !error &&
    txn &&
    (txn.status === "Success" ||
      txn.status === "SUCCESS" ||
      txn.status === "COMPLETED");

  if (!isSuccess) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-4">
        <Card className="w-full max-w-md border-destructive/20 shadow-xl bg-card">
          <CardContent className="flex flex-col items-center justify-center p-8 text-center space-y-6">
            <div className="p-4 rounded-full bg-destructive/10 text-destructive border border-destructive/20">
              <XCircle className="h-12 w-12" />
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-foreground">
                Payment Failed
              </h1>
              <p className="text-sm text-muted-foreground">
                {txn?.cbs_message ||
                  error ||
                  "Your transaction could not be processed."}
              </p>
            </div>

            <div className="w-full space-y-3 pt-2">
              <Button
                onClick={() => router.push("/")}
                className="w-full h-11"
                variant="default"
              >
                Return to Shop
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md border-border/40 shadow-xl bg-card">
        <CardContent className="flex flex-col items-center p-8 text-center space-y-6">
          <div className="p-4 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
            <CheckCircle2 className="h-12 w-12 text-emerald-600" />
          </div>

          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-foreground">
              Payment Successful!
            </h1>
            <p className="text-sm text-muted-foreground">
              Thank you for your purchase. Your order has been placed
              successfully.
            </p>
          </div>

          {txn && (
            <div className="w-full bg-muted/40 border border-border/60 rounded-xl p-4 space-y-3 text-left text-sm">
              <div className="flex items-center justify-between border-b border-border/40 pb-2">
                <span className="text-muted-foreground flex items-center gap-1.5">
                  <Receipt className="h-4 w-4" /> Transaction ID
                </span>
                <span className="font-mono font-medium text-foreground">
                  {txn.merchant_txn_id}
                </span>
              </div>

              {txn.order && (
                <div className="flex items-center justify-between border-b border-border/40 pb-2">
                  <span className="text-muted-foreground">Order ID</span>
                  <span className="font-semibold text-foreground">
                    #{txn.order}
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between border-b border-border/40 pb-2">
                <span className="text-muted-foreground">Amount Paid</span>
                <span className="font-bold text-primary">NPR {txn.amount}</span>
              </div>

              {txn.institution && (
                <div className="flex items-center justify-between border-b border-border/40 pb-2">
                  <span className="text-muted-foreground">Institution</span>
                  <span className="text-foreground">{txn.institution}</span>
                </div>
              )}

              {txn.instrument && (
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Payment Method</span>
                  <span className="text-foreground">{txn.instrument}</span>
                </div>
              )}
            </div>
          )}

          <div className="w-full pt-2">
            <Button
              onClick={() => router.push("/")}
              className="w-full h-11 font-medium gap-2"
            >
              <ShoppingBag className="h-4 w-4" /> Continue Shopping{" "}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
