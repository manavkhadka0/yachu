import About from "@/components/about-us/About";
import OurTeam from "@/components/about-us/OurTeam";
import BlogSection from "@/components/blog/BlogSection";
import ContactForm from "@/components/contact/ContactForm";
import FAQ from "@/components/contact/FAQ";
import FlowerDivider from "@/components/custom-ui/FlowerDivider";

import Hero from "@/components/hero/Hero";
import Ingredients from "@/components/ingredients/Ingredients";
import ProductShowcase from "@/components/product/ProductShowcase";

export default function Home() {
  return (
    <main className="flex flex-col ">
      <Hero />
      <FlowerDivider />
      <ProductShowcase />
      <Ingredients />
      <FlowerDivider />
      <About />
      <OurTeam />
      <FlowerDivider />
      <BlogSection />
      {/* <VideoShowcase /> */}
      <FlowerDivider />
      <div className="container mb-20 mt-10">
        <div className=" flex justify-center flex-col max-w-3xl mx-auto mb-16">
          <h3 className="sm:text-2xl font-bold  uppercase text-center">
            Contact Yachu
          </h3>
          <ContactForm />
        </div>
        <h3 className="sm:text-2xl text-xl font-bold">FAQs</h3>
        <FAQ />
      </div>
    </main>
  );
}
