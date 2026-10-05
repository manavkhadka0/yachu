"use client";
import YachuHairOilBenefits from "@/components/home/YachuHairOilBenefits";
import YachuHairOilHowToUse from "@/components/home/YachuHairOilHowToUse";
import FAQ from "@/components/contact/FAQ";
import HeroSection from "@/components/home/hero-section/hero-section";
import DashainDhamaka from "@/components/home/DashainDhamaka";
import BeforeAfter from "@/components/home/BeforeAfter";
import VideoStories from "@/components/home/VideoStories";
import Ingredients from "@/components/home/Ingredients";
import Story from "@/components/home/Story";
import Commercial from "@/components/home/Commercial";
import ContactSection from "@/components/home/ContactSection";
import ProductShowcase from "@/components/product/product-showcase";
import { BlogSection } from "@/components/blog/blog-section";
import { useProducts } from "@/hooks/use-products";
import { useBlogs } from "@/hooks/use-blogs";
import { useQuickOrder } from "@/hooks/use-quick-order";
import StickyOrderBar from "@/components/home/StickyOrderBar";
import SectionHeading from "@/components/home/SectionHeading";
import { CheckoutModal } from "@/components/popover/CheckoutModal";

export default function HomePage() {
  const { handleOrder, checkoutOpen, setCheckoutOpen } = useQuickOrder();

  const {
    data: products,
    isLoading: productsLoading,
    error: productsError,
  } = useProducts();

  const {
    data: blogsResponse,
    isLoading: blogsLoading,
    error: blogsError,
  } = useBlogs({
    page: 1,
    page_size: 3,
  });

  const blogs = blogsResponse?.results;

  return (
    <div className="flex flex-col">
      <HeroSection onOrder={handleOrder} />
      <DashainDhamaka onOrder={handleOrder} />
      <YachuHairOilHowToUse />
      <BeforeAfter onOrder={handleOrder} />
      <VideoStories />
      <ProductShowcase
        products={products}
        isLoading={productsLoading}
        error={productsError}
      />
      <Ingredients />
      <YachuHairOilBenefits onOrder={handleOrder} />
      <Story />
      <Commercial />
      <BlogSection
        blogs={blogs}
        title="Stories & rituals"
        description="From the journal"
        maxItems={3}
        isLoading={blogsLoading}
        error={blogsError}
      />
      <section id="faq" className="relative py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-6">
          <SectionHeading eyebrow="Good questions" title="Frequently asked" />
          <FAQ />
        </div>
      </section>
      <ContactSection />
      <StickyOrderBar onOrder={handleOrder} />
      <CheckoutModal isOpen={checkoutOpen} setIsOpen={setCheckoutOpen} />
    </div>
  );
}
