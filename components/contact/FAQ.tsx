import { BASE_API_URL } from "@/utils/config";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { FAQs } from "@/types/faqs";

const FAQ_LIST: FAQs = [
  {
    id: 1,
    question:
      "What makes Yachu Hair Oil different from other hair care products on the market?",
    answer:
      "Yachu Hair Oil stands out for its commitment to blending tradition with innovation. Our premium botanical oils, crafted through generations-old techniques, harness the power of natural ingredients like coconut, olive, almond, and castor oils. Our expert formulations are designed to cater to various hair goals, providing a unique and effective solution for healthier, more beautiful hair.",
  },
  {
    id: 2,
    question: "Are Yachu Hair Oils suitable for all hair types?",
    answer:
      "Yes, absolutely! Our carefully curated blends are versatile and suitable for all hair types. Whether you have fine, straight hair or thick, curly locks, our oils are formulated to nourish and enhance the natural beauty of your hair without weighing it down.",
  },
  {
    id: 3,
    question: "How quickly will I see results from using Yachu Hair Oil?",
    answer:
      "While individual results may vary, many of our customers notice positive changes in the texture and health of their hair after just a few uses. Consistency is key, and incorporating Yachu Hair Oil into your regular hair care routine will contribute to long-term benefits such as improved strength, reduced frizz, and enhanced shine.",
  },
  {
    id: 4,
    question: "Is Yachu committed to sustainable and ethical practices?",
    answer:
      "Absolutely. Yachu takes pride in conducting business responsibly and sustainably. Our oils are packaged in recyclable materials, and we actively participate in programs that contribute to environmental conservation, such as tree planting initiatives and carbon offset projects. We are dedicated to minimizing our environmental impact while providing exceptional hair care products.",
  },
];

const getFAQs = async () => {
  try {
    const response = await fetch(BASE_API_URL + "/faqs", { next: { revalidate: 10 } })
    return response.json();
  }
  catch (error) {
    console.error("Error fetching FAQs", error);
    return FAQ_LIST;
  }
}

const FAQ = async () => {
  let data: FAQs = await getFAQs();

  if (data.length === 0) {
    data = FAQ_LIST;
  }

  return (
    <Accordion type="single" collapsible className="w-full">
      {data.map(({ question, answer }, index) => (
        <AccordionItem value={`item-${index + 1}`} key={index + 1}>
          <AccordionTrigger>{question}</AccordionTrigger>
          <AccordionContent>{answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
export default FAQ;
