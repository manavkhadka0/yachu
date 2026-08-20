import { Suspense } from "react";
import NPSCallbackContent from "./NPSCallbackContent";

export const metadata = {
  title: "Payment Callback | Yachu Hair Oil",
  description: "NPS Payment Transaction Verification",
};

export default function NPSCallbackPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[70vh] flex items-center justify-center">
        <p className="text-muted-foreground animate-pulse">Loading transaction status...</p>
      </div>
    }>
      <NPSCallbackContent />
    </Suspense>
  );
}
