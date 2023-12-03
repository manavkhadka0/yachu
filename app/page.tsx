import About from "@/components/about-us/About";
import BlogSection from "@/components/blog/BlogSection";
import Contact from "@/components/contact/Contact";
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
      <FlowerDivider />
      <BlogSection />
      <FlowerDivider />
      <Contact />
    </main>
  );
}
