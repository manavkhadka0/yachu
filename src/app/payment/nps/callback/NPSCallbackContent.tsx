"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { verifyNPSTransaction, NPSVerifyResponse } from "@/services/api/nps";
import useProductCart from "@/store/zustand";
import { useCreateOrder } from "@/hooks/use-orders";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  XCircle,
  Clock,
  AlertTriangle,
  Loader2,
  ArrowRight,
  ShoppingBag,
  Receipt,
  RotateCw,
} from "lucide-react";
import posthog from "posthog-js";
import { toast } from "sonner";

type CallbackViewState = "loading" | "success" | "pending" | "failed" | "error";

interface SavedCheckoutPayload {
  name: string;
  email?: string | null;
  phone: string;
  alternate_phone?: string | null;
  address: string;
  remarks?: string | null;
  total_amount?: number;
  order_products?: { product_id: number; quantity: number }[];
}

export default function NPSCallbackContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { clearCart } = useProductCart();
  const createOrderMutation = useCreateOrder();

  const merchantTxnId =
    searchParams.get("MerchantTxnId") || searchParams.get("merchant_txn_id");

  const [viewState, setViewState] = useState<CallbackViewState>("loading");
  const [txn, setTxn] = useState<NPSVerifyResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [pollCount, setPollCount] = useState(0);

  const orderCreatedRef = useRef(false);
  const isPollingRef = useRef(false);

  const getSavedCheckoutData = (): {
    customerName?: string;
    customerPhone?: string;
    payload: SavedCheckoutPayload | null;
  } => {
    try {
      const saved = localStorage.getItem("nps_pending_checkout");
      if (saved) {
        const parsed = JSON.parse(saved) as SavedCheckoutPayload;
        return {
          customerName: parsed.name,
          customerPhone: parsed.phone,
          payload: parsed,
        };
      }
    } catch (e) {
      console.warn("Could not read pending checkout from localStorage", e);
    }
    return { payload: null };
  };

  const handleOrderCreation = useCallback(
    async (verifiedTxn: NPSVerifyResponse, payload: SavedCheckoutPayload) => {
      if (orderCreatedRef.current) return;
      orderCreatedRef.current = true;

      try {
        const orderPayload = {
          full_name: payload.name,
          email: payload.email || null,
          phone_number: payload.phone,
          alternate_phone_number: payload.alternate_phone || null,
          delivery_address: payload.address,
          payment_method: "NPS / OnePG",
          payment_type: "NPS",
          total_amount:
            Number(verifiedTxn.amount) || payload.total_amount || 0,
          order_products: payload.order_products || [],
          remarks: payload.remarks || null,
          transaction_id: verifiedTxn.merchant_txn_id || merchantTxnId,
          is_paid: true,
        };

        await createOrderMutation.mutateAsync(orderPayload);
        clearCart();
        localStorage.removeItem("nps_pending_checkout");
      } catch (createErr) {
        orderCreatedRef.current = false;
        console.error("Failed to create order post-payment:", createErr);
        toast.error("Order Creation Failed", {
          description: "Payment was successful, but there was an error recording your order. Please contact support with your Transaction ID.",
        });
      }
    },
    [createOrderMutation, clearCart, merchantTxnId]
  );

  const checkTransaction = useCallback(
    async (isManualRetry = false) => {
      if (!merchantTxnId) {
        setErrorMessage("Missing merchant transaction reference ID.");
        setViewState("error");
        return;
      }

      if (isManualRetry) {
        setViewState("loading");
        setErrorMessage(null);
      }

      const { customerName, customerPhone, payload } = getSavedCheckoutData();

      try {
        const data = await verifyNPSTransaction(
          merchantTxnId,
          customerName,
          customerPhone
        );
        setTxn(data);

        const normalizedStatus = (data.status || "").toUpperCase();

        if (normalizedStatus === "SUCCESS" || normalizedStatus === "COMPLETED") {
          setViewState("success");
          toast.success("Payment successful! Order placed.");

          if (payload) {
            await handleOrderCreation(data, payload);
          } else {
            clearCart();
            localStorage.removeItem("nps_pending_checkout");
          }

          posthog.capture("nps_payment_success", {
            merchant_txn_id: data.merchant_txn_id,
            amount: data.amount,
            order_id: data.order,
          });
        } else if (normalizedStatus === "PENDING") {
          setViewState("pending");
        } else {
          // "Fail", "FAILED", etc.
          setViewState("failed");
          toast.error("Payment Failed", {
            description: data.cbs_message || "Transaction was not successful.",
          });
        }
      } catch (err: unknown) {
        const msg =
          err instanceof Error
            ? err.message
            : "Could not verify transaction status.";
        setErrorMessage(msg);
        setViewState("error");
        toast.error("Verification Error", { description: msg });
      }
    },
    [merchantTxnId, handleOrderCreation, clearCart]
  );

  // Initial verification on mount
  useEffect(() => {
    if (isPollingRef.current) return;
    isPollingRef.current = true;
    checkTransaction();
  }, [checkTransaction]);

  // Polling logic for PENDING state (up to 5 attempts every 3s)
  useEffect(() => {
    if (viewState !== "pending") return;

    if (pollCount >= 5) {
      return; // Max attempts reached, stay on reassuring pending view
    }

    const timer = setTimeout(() => {
      setPollCount((prev) => prev + 1);
      checkTransaction();
    }, 3000);

    return () => clearTimeout(timer);
  }, [viewState, pollCount, checkTransaction]);

  // Shared wrapper component for UI cards
  const CallbackCardWrapper = ({
    children,
    borderColorClass = "border-border/40",
  }: {
    children: React.ReactNode;
    borderColorClass?: string;
  }) => (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-4">
      <Card className={`w-full max-w-md shadow-xl bg-card ${borderColorClass}`}>
        <CardContent className="flex flex-col items-center p-8 text-center space-y-6">
          {children}
        </CardContent>
      </Card>
    </div>
  );

  // 1. LOADING VIEW
  if (viewState === "loading") {
    return (
      <CallbackCardWrapper>
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
      </CallbackCardWrapper>
    );
  }

  // 2. PENDING VIEW
  if (viewState === "pending") {
    const isMaxAttemptsReached = pollCount >= 5;

    return (
      <CallbackCardWrapper borderColorClass="border-amber-500/20">
        <div className="p-4 rounded-full bg-amber-500/10 text-amber-600 border border-amber-500/20">
          <Clock className="h-12 w-12 animate-pulse" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-foreground">
            {isMaxAttemptsReached
              ? "Payment Status Pending"
              : "Confirming Your Payment..."}
          </h1>
          <p className="text-sm text-muted-foreground">
            {isMaxAttemptsReached
              ? "Your payment is taking a bit longer to process at the bank. Don't worry, your payment is safe and we'll update your order automatically once confirmed."
              : "We are waiting for final confirmation from your bank or wallet. Please do not close or refresh this page."}
          </p>
        </div>

        {!isMaxAttemptsReached && (
          <div className="flex items-center gap-2 text-xs text-amber-700 bg-amber-50 px-3 py-2 rounded-lg border border-amber-200">
            <Loader2 className="h-4 w-4 animate-spin shrink-0" />
            <span>Checking bank status (Attempt {pollCount + 1} of 5)...</span>
          </div>
        )}

        <div className="w-full space-y-3 pt-2">
          {isMaxAttemptsReached ? (
            <Button
              onClick={() => router.push("/")}
              className="w-full h-11 font-medium gap-2"
            >
              <ShoppingBag className="h-4 w-4" /> Return to Home
            </Button>
          ) : (
            <Button
              onClick={() => checkTransaction(true)}
              variant="outline"
              className="w-full h-11 gap-2"
            >
              <RotateCw className="h-4 w-4" /> Refresh Status Now
            </Button>
          )}
        </div>
      </CallbackCardWrapper>
    );
  }

  // 3. ERROR VIEW (Verification Call / API Failure)
  if (viewState === "error") {
    return (
      <CallbackCardWrapper borderColorClass="border-amber-500/30">
        <div className="p-4 rounded-full bg-amber-500/10 text-amber-600 border border-amber-500/20">
          <AlertTriangle className="h-12 w-12" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-foreground">
            Couldn't Verify Payment
          </h1>
          <p className="text-sm text-muted-foreground">
            {errorMessage ||
              "We encountered an issue connecting to the payment verification service."}
          </p>
        </div>

        <div className="bg-muted/40 p-3 rounded-lg border border-border/50 text-xs text-muted-foreground text-left">
          <p className="font-semibold text-foreground mb-1">💡 Good to know:</p>
          If money was deducted from your account, your payment will be
          automatically reconciled and verified shortly.
        </div>

        <div className="w-full space-y-3 pt-2">
          <Button
            onClick={() => checkTransaction(true)}
            className="w-full h-11 gap-2"
          >
            <RotateCw className="h-4 w-4" /> Retry Check
          </Button>
          <Button
            onClick={() => router.push("/")}
            variant="outline"
            className="w-full h-11"
          >
            Return to Home
          </Button>
        </div>
      </CallbackCardWrapper>
    );
  }

  // 4. FAILED VIEW (Explicit Gateway Payment Failure)
  if (viewState === "failed") {
    return (
      <CallbackCardWrapper borderColorClass="border-destructive/20">
        <div className="p-4 rounded-full bg-destructive/10 text-destructive border border-destructive/20">
          <XCircle className="h-12 w-12" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-foreground">Payment Failed</h1>
          <p className="text-sm text-muted-foreground">
            {txn?.cbs_message ||
              "Your transaction was not completed. No charges were made."}
          </p>
        </div>

        <div className="w-full space-y-3 pt-2">
          <Button
            onClick={() => router.push("/")}
            className="w-full h-11"
            variant="default"
          >
            Try Again
          </Button>
        </div>
      </CallbackCardWrapper>
    );
  }

  // 5. SUCCESS VIEW
  return (
    <CallbackCardWrapper>
      <div className="p-4 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
        <CheckCircle2 className="h-12 w-12 text-emerald-600" />
      </div>

      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-foreground">
          Payment Successful!
        </h1>
        <p className="text-sm text-muted-foreground">
          Thank you for your purchase. Your order has been placed successfully.
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
              <span className="font-semibold text-foreground">#{txn.order}</span>
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
    </CallbackCardWrapper>
  );
}
