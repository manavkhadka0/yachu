import FlowerDivider from "../custom-ui/FlowerDivider";
import ContactDetails from "./ContactDetails";
import ContactForm from "./ContactForm";
import FAQ from "./FAQ";

const Contact = () => {
  return (
    <div className="w-full py-9">
      <h3 className="text-2xl font-bold mb-4 ">Contact Us</h3>
      <div className=" grid grid-cols-2 mx-auto  gap-10 ">
        <ContactForm />
        <ContactDetails />
      </div>
      <FlowerDivider />
      <div className="mx-auto ">
        <h3 className="sm:text-2xl text-xl font-bold">FAQs</h3>
        <FAQ />
      </div>
    </div>
  );
};
export default Contact;
