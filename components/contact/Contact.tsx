import ContactDetails from "./ContactDetails";
import ContactForm from "./ContactForm";
import FAQ from "./FAQ";

const Contact = () => {
  return (
    <div className=" pt-12  pb-16 w-full" id="contact">
      <div className=" grid sm:grid-flow-col grid-flow-row sm:grid-cols-2 w-full gap-10 ">
        <div className=" p-5 sm:p-8 shadow-lg  rounded-lg ">
          <div className=" mb-10 ">
            <h1 className=" text-2xl sm:text-3xl font-bold mb-1">
              Contact Yachu
            </h1>
            <p className=" text-slate-500 font-medium text-sm sm:text-base">
              Fill in your details and send us a message
            </p>
          </div>
          <ContactForm />
        </div>
        <ContactDetails />
      </div>
      <div className=" w-full mt-16 ">
        <h3 className=" sm:text-2xl text-xl font-bold">FAQs</h3>
        <FAQ />
      </div>
    </div>
  );
};
export default Contact;
