import About from "@/components/home/about-us/About";
import OurTeam from "@/components/home/about-us/OurTeam";
import ContactForm from "@/components/contact/ContactForm";
import YachuHairOilBenefits from "@/components/home/YachuHairOilBenefits";
import YachuHairOilHowToUse from "@/components/home/YachuHairOilHowToUse";
import FAQ from "@/components/contact/FAQ";
import FlowerDivider from "@/components/shared/FlowerDivider";
import InstagramEmbed from "@/components/home/InstagramEmbed";
import Hero from "@/components/home/hero/Hero";
import Ingredients from "@/components/home/Ingredients";
import ProductShowcase from "@/components/product/ProductShowcase";
import Questions from "@/components/home/about-us/Questions";
import YachuWomen from "@/components/home/YachuWomen";
import InstaFeed from "@/components/home/InstaFeed";
import Image from "next/image";
import BlogSection from "@/components/blog/BlogSection";
import Gallery from "@/components/gallery/Gallery";
import StickyScrollRevealDemo from "./franchises/page";
import { BASE_API_URL } from "@/utils/config";
import { OUR_TEAM } from "@/constants/about";
import { TProduct } from "@/types/product";

const getProducts = async () => {
  try {
    const res = await fetch(BASE_API_URL + "/products", {
      next: { revalidate: 10 },
    });
    return res.json();
  } catch (error) {
    console.error("Error fetching Products", error);
  }
};



const getBlogs = async () => {
  try {
    const blogs = await fetch(BASE_API_URL + "/latest-posts", {
      next: { revalidate: 10 },
    });
    const data = await blogs.json();
    return data.recent_posts;
  } catch (error) {
    console.error("Error fetching Blogs", error);
    console.log(error);
  }
};

export default async function Home() {
  const products = await getProducts();
  const blogs = await getBlogs();
  return (
    <main className="flex flex-col ">
      <Hero />
      <FlowerDivider />

      <ProductShowcase products={products} />

      <FlowerDivider />

      <Ingredients />
      <YachuHairOilBenefits />
      <FlowerDivider />
      <YachuHairOilHowToUse />

      <FlowerDivider />
      <Questions />
      <FlowerDivider />
      <BlogSection blogs={blogs} />

      <FlowerDivider />

      <div className="container mb-20 mt-10">
        <ContactForm />

        <div className="py-20"></div>
        <FlowerDivider />
        <h3 className="text-4xl text-black text-center leading-tight font-bold mt-5 pt-6">
          Frequently Asked Questions
        </h3>
        <p className="text-center font-normal pb-4 pt-3 text-sm text-gray-600">
          Here are some common questions about Yachu Hair Oil, Answered for you
        </p>
        <FAQ />
        <div className="py-20"></div>
      </div>
    </main>
  );
}
