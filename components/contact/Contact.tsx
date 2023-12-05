import ContactDetails from "./ContactDetails";
import ContactForm from "./ContactForm";
import FAQ from "./FAQ";

const Contact = () => {
  return (
    <div className="w-full pt-12 container pb-16" id="contact">
      <div className=" grid sm:grid-flow-col grid-flow-row sm:grid-cols-2 mx-auto  gap-10 ">
        <ContactForm />
        <ContactDetails />
      </div>
      <div className="mx-auto mt-16 ">
        <h3 className="sm:text-2xl text-xl font-bold">FAQs</h3>
        <FAQ />
      </div>
    </div>
  );
};
export default Contact;
