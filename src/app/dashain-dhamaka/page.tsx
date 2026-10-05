import type { Metadata } from "next";
import DashainDhamakaPage from "./dashain-dhamaka-page";

const title = "Dashain Dhamaka | Buy Yachu Hair Oil, Win an Electric Scooter";
const description =
  "Every Yachu bottle comes with a Scratch & Win card this Dashain. Up to 16% off, Cash on Delivery, delivery all over Nepal.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    images: [
      {
        url: "/dashain.png",
        width: 1050,
        height: 600,
        alt: "Yachu Dashain Dhamaka: Scratch and Win",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/dashain.png"],
  },
};

export default function Page() {
  return <DashainDhamakaPage />;
}
