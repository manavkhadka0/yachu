import ContactDetails from "./ContactDetails";
import ContactForm from "./ContactForm";
import FAQ from "./FAQ";
import FlowerDivider from "@/components/shared/FlowerDivider";

const Contact = () => {
  return (
    <div className="pt-12 pb-24 w-full" id="contact">
      {/* Central container for ContactForm + ContactDetails */}
      <div className="w-full flex justify-center">
        <div className="w-full max-w-5xl px-4">
          <ContactForm />
        </div>
      </div>

      {/* FAQ Section */}
      <div className="w-full mt-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-4xl font-bold mt-5 pt-6">
            Frequently Asked Questions
          </h3>
          <p className="font-normal pb-4 pt-3 text-sm text-gray-400">
            Here are some common questions about Yachu Hair Oil, answered for
            you
          </p>
          <FAQ />
        </div>
      </div>
    </div>
  );
};

export default Contact;
