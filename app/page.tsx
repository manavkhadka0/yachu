import About from "@/components/about-us/About";
import OurTeam from "@/components/about-us/OurTeam";
import BlogSection from "@/components/blog/BlogSection";
import ContactForm from "@/components/contact/ContactForm";
import FlowerDivider from "@/components/custom-ui/FlowerDivider";

import Hero from "@/components/hero/Hero";
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
      <FlowerDivider />
      <BlogSection />
      <FlowerDivider />
      <div className="container mb-16">
        <div className=" flex justify-center flex-col max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold my-5  text-center">Contact Us</h1>
          <ContactForm />
        </div>
      </div>
    </main>
  );
}
