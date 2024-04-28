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
import BlogSection from "@/components/blog/BlogSection";
import { BASE_URL } from "@/utils/config";
import { TSiteSetting } from "@/types/site-setting";
import Testimonials from "@/components/home/Testimonials";

const DUMMY_SITE_CONFIG: TSiteSetting = [
  {
    id: 1,
    meta_title: "Meta Title Landing Page",
    meta_description: "Meta Description Landing Page",
    hero_title: "Title",
    hero_section_subtitle:
      "Discover The Best Hiking Trails And Bee-Watching Spots On Your Next Adventure. Book A Trip Now",
    hero_section_image: "./yachu-hero.png",
    about_founder: "dummy_founder",
    message_from_ceo: "dummy_messgae",
    our_story: "dummy_story",
  },
];

async function getData() {
  try {
    const response = await fetch(BASE_URL + "/site-configssss", {
      next: { revalidate: 10 },
    });
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return response.json();
  } catch (error) {
    // This will activate the closest `error.js` Error Boundary
    return DUMMY_SITE_CONFIG;
  }
}

export default async function Home() {
  const data: TSiteSetting = await getData();

  return (
    <main className="flex flex-col ">
      <Hero />
      <FlowerDivider />
      {/* ------------ Products ------------*/}
      <ProductShowcase />

      <FlowerDivider />

      <Ingredients />

      <FlowerDivider />
      <BlogSection />

      {/* ---------------------------------- */}
      <FlowerDivider />
      {/* --------- About Yachu ------------*/}
      <About
        about_founder={data[0].about_founder}
        our_story={data[0].our_story}
      />
      {/* ---------------------------------- */}

      <Questions />

      <FlowerDivider />

      <OurTeam />
      {/* ---------------------------------- */}

      <YachuWomen />
      <FlowerDivider />
      {/* --------- Instagram and Youtube------------*/}
      <InstaFeed />
      {/* <VideoShowcase /> */}
      {/* ---------------------------------- */}

      <Testimonials />
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
        <FlowerDivider />
        <h3 className="text-4xl text-center font-bold mt-5 pt-6">
          Frequently Asked Questions
        </h3>
        <p className="text-center font-normal pb-4 pt-3 text-sm text-gray-400">
          Here are some common questions about Yachu Hail Oil, Answered for you
        </p>
        <FAQ />
      </div>
    </main>
  );
}
