import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

const FAQ_LIST = [
  {
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
    desccription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque non sapien ac arcu laoreet luctus ac vitae tortor.",
  },
  {
    title: "Consectetur adipiscing elit?",
    desccription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque non sapien ac arcu laoreet luctus ac vitae tortor.",
  },
  {
    title: "Quisque non sapien ac arcu laoreet luctus ac vitae tortor?",
    desccription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque non sapien ac arcu laoreet luctus ac vitae tortor.",
  },
  {
    title: "Dolor sit amet, consectetur adipiscing elit?",
    desccription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque non sapien ac arcu laoreet luctus ac vitae tortor.",
  },
];

const FAQ = () => {
  return (
    <Accordion type="single" collapsible className="w-full">
      {FAQ_LIST.map(({ title, desccription }, index) => (
        <AccordionItem value={`item-${index + 1}`} key={index}>
          <AccordionTrigger>{title}</AccordionTrigger>
          <AccordionContent>{desccription}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
export default FAQ;
