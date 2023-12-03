import About from "@/components/about-us/About";
import OurTeam from "@/components/about-us/OurTeam";
import BlogSection from "@/components/blog/BlogSection";
import ContactForm from "@/components/contact/ContactForm";
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
      <FlowerDivider />
      <About />
      <OurTeam />
      <Ingredients />
      <FlowerDivider />
      <BlogSection />
      <FlowerDivider />
      <div className="container mb-16">
        <div className=" flex justify-center flex-col max-w-3xl mx-auto">
          <h3 className="sm:text-2xl font-bold  uppercase text-center">
            Contact Yachu
          </h3>
          <ContactForm />
        </div>
      </div>
    </main>
  );
}
