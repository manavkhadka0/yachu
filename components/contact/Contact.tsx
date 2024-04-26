import ContactDetails from "./ContactDetails";
import ContactForm from "./ContactForm";
import FAQ from "./FAQ";
import FlowerDivider from "@/components/shared/FlowerDivider";

const Contact = () => {
  return (
    <div className=" pt-12 pb-24 w-full" id="contact">
      <div className=" mx-auto pb-24">
        <div className=" p-5 mx-auto sm:p-8 shadow max-w-3xl rounded-lg ">
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
        <FlowerDivider />
        <ContactDetails />
      </div>
      <div className=" w-full mt-16 ">
        <h3 className="text-4xl text-center font-bold mt-5 pt-6">
          Frequently Asked Questions
        </h3>
        <p className="text-center font-normal pb-4 pt-3 text-sm text-gray-400">
          Here are some common questions about Yachu Hail Oil, Answered for you
        </p>
        <FAQ />
      </div>
    </div>
  );
};
export default Contact;
