import { Metadata } from "next";
import PriceGuessForm from "@/components/price-guess/price-guess-form";

export const metadata: Metadata = {
  title: "Price Guess Game | Yachu Hair Oil",
  description: "Guess the prices of our new products and win exciting prizes",
  robots: {
    index: false,
    follow: false,
  },
};

const PriceGuessPage = () => {
  return <PriceGuessForm />;
};

export default PriceGuessPage;


