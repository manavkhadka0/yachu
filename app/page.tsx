import About from "@/components/home/about-us/About";
import OurTeam from "@/components/home/about-us/OurTeam";
import ContactForm from "@/components/contact/ContactForm";
import FAQ from "@/components/contact/FAQ";
import FlowerDivider from "@/components/shared/FlowerDivider";

import Hero from "@/components/home/hero/Hero";
import Ingredients from "@/components/home/Ingredients";
import ProductShowcase from "@/components/product/ProductShowcase";
import Questions from "@/components/home/about-us/Questions";
import YachuWomen from "@/components/home/YachuWomen";
import InstaFeed from "@/components/home/InstaFeed";
import Image from "next/image";
import BlogCard from "@/components/blog/BlogCard";
import BlogSection from "@/components/blog/BlogSection";

export default function Home() {
  return (
    <main className="flex flex-col ">
      <Hero />
      <FlowerDivider />
      {/* ------------ Products ------------*/}
      <ProductShowcase />
      <Ingredients />
      <FlowerDivider />
      <BlogSection />
      {/* ---------------------------------- */}
      <FlowerDivider />
      {/* --------- About Yachu ------------*/}
      <About />
      <FlowerDivider />
      <Questions />
      <FlowerDivider />

      <OurTeam />
      {/* ---------------------------------- */}
      <FlowerDivider />
      <YachuWomen />
      <FlowerDivider />
      {/* --------- Instagram and Youtube------------*/}
      <InstaFeed />
      {/* <VideoShowcase /> */}
      {/* ---------------------------------- */}
      <FlowerDivider />
      {/* <Testimonials /> */}
      <div className="container mb-20 mt-10">
        <div className=" flex justify-center flex-col max-w-3xl mx-auto mb-16">
          <div className=" mb-12  flex flex-col justify-center items-center gap-2">
            <Image
              src={"/team/parbati-shrestha-gm.jpg"}
              alt="contact-person"
              width={150}
              height={150}
              className=" rounded-full h-28 w-28 object-cover "
            />
            <h1 className=" text-center text-2xl sm:text-3xl font-bold mb-1">
              Contact Yachu
            </h1>
            <p className=" text-center text-slate-500 font-medium text-sm sm:text-base">
              Fill in your details and send us a message
            </p>
          </div>
          <ContactForm />
        </div>
        <h3 className="sm:text-2xl text-xl font-bold">FAQs</h3>
        <FAQ />
      </div>
    </main>
  );
}
