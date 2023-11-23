import BlogSection from "@/components/blog/BlogSection";
import FlowerDivider from "@/components/custom-ui/FlowerDivider";
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import Hero from "@/components/hero/Hero";
import ProductShowcase from "@/components/product/ProductShowcase";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col ">
      <Header />
      <Hero />
      <FlowerDivider />
      <ProductShowcase />
      <BlogSection />
      <Footer />
    </main>
  );
}
