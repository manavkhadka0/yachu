import ContactSection from "@/components/home/ContactSection";
import SectionHeading from "@/components/home/SectionHeading";
import FAQ from "./FAQ";

const Contact = () => {
  return (
    <div className="flex flex-col">
      <ContactSection as="h1" />

      <section className="relative py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-6">
          <SectionHeading eyebrow="Good questions" title="Frequently asked" />
          <FAQ />
        </div>
      </section>
    </div>
  );
};

export default Contact;
