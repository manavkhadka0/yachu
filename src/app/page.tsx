"use client";
import ContactForm from "@/components/contact/ContactForm";
import YachuHairOilBenefits from "@/components/home/YachuHairOilBenefits";
import YachuHairOilHowToUse from "@/components/home/YachuHairOilHowToUse";
import FAQ from "@/components/contact/FAQ";
import FlowerDivider from "@/components/shared/FlowerDivider";
import HeroSection from "@/components/home/hero-section/hero-section";
import Ingredients from "@/components/home/Ingredients";
import ProductShowcase from "@/components/product/product-showcase";
import { Questions } from "@/components/home/about-us/Questions";
import { BlogSection } from "@/components/blog/blog-section";
import { useProducts } from "@/hooks/use-products";
import { useBlogs } from "@/hooks/use-blogs";
import Image from "next/image";
import HowToUseYachuHairOil from "@/components/home/HowTOUse";

export default function HomePage() {
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
    page_size: 4, // Changed to 4 to match maxItems in BlogSection
  });

  const blogs = blogsResponse?.results;

  return (
    <main className="flex flex-col">
      <HeroSection />
      <FlowerDivider />
      <HowToUseYachuHairOil />
      <FlowerDivider />
      <ProductShowcase
        products={products}
        isLoading={productsLoading}
        error={productsError}
      />
      <FlowerDivider />
      <Ingredients />
      <FlowerDivider />
      <YachuHairOilBenefits />
      <FlowerDivider />
      <YachuHairOilHowToUse />
      <FlowerDivider />
      <Questions />
      <FlowerDivider />
      <div className="mx-auto">
        <BlogSection
          blogs={blogs}
          title="Latest Blog Articles"
          description="Explore our latest articles about hair care, hair growth and more"
          maxItems={4}
          isLoading={blogsLoading}
          error={blogsError}
        />
      </div>
      <FlowerDivider />
      <div className="w-full px-10 sm:px-16 lg:px-32">
        <ContactForm />
      </div>
      <FlowerDivider />
      <h3 className="text-4xl text-background-foreground text-center leading-tight font-bold mt-5 pt-6">
        Frequently Asked Questions
      </h3>
      <p className="text-center font-normal pb-4 pt-3 text-sm text-foreground">
        Here are some common questions about Yachu Hair Oil, Answered for you
      </p>
      <div className="w-full max-w-2xl mx-auto p-4">
        <FAQ />
      </div>
      <FlowerDivider />
      <div className="py-20"></div>
    </main>
  );
}
