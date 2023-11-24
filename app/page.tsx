import BlogSection from "@/components/blog/BlogSection";
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
      <BlogSection />
    </main>
  );
}
