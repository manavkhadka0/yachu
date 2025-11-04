import { Metadata } from "next";
import OrderDetailsPage from "./order-details-page";

export const metadata: Metadata = {
  title: "Order Details | Yachu Hair Oil",
  description:
    "View your order details, track your shipment, and manage your purchase information.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Page() {
  return <OrderDetailsPage />;
}