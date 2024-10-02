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

export default async function Home() {
  return (
    <main className="flex flex-col ">
      <Hero />
      <FlowerDivider />
      <p className=" text-4xl  mb-4 text-center font-bold text-black">
        50K+ Happy And Satisfied Yachu Users
      </p>
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 py-20 pb-40">
        <InstagramEmbed url="https://www.instagram.com/p/C-PhVnuAgj6/" />
        <InstagramEmbed url="https://www.instagram.com/p/C-PhjiBA_lp/" />
        <InstagramEmbed url="https://www.instagram.com/p/C_47iTVor2a/" />
        <InstagramEmbed url="https://www.instagram.com/p/C_46Dk2I1gl/" />
      </div>
      {/* ------------ Products ------------*/}

      <ProductShowcase />

      <FlowerDivider />

      <Ingredients />
      <YachuHairOilBenefits />
      <FlowerDivider />
      <YachuHairOilHowToUse />

      <FlowerDivider />
      <BlogSection />

      {/* ---------------------------------- */}
      <FlowerDivider />
      {/* --------- About Yachu ------------*/}
      <About aboutdetails={[]} />
      {/* ---------------------------------- */}

      <Questions />
      <FlowerDivider />
      <Gallery />

      <FlowerDivider />

      <OurTeam />
      {/* ---------------------------------- */}

      <YachuWomen />
      <FlowerDivider />
      {/* --------- Instagram and Youtube------------*/}
      <InstaFeed />
      {/* ---------------------------------- */}

      {/* <Testimonials /> */}
      <FlowerDivider />

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
        <p className="text-4xl text-black text-center leading-tight font-bold mt-5 pb-12">
          Our Franchises
        </p>
        <div className="py-20"></div>
        <StickyScrollRevealDemo />
        <div className="py-20"></div>
        <FlowerDivider />
        <h3 className="text-4xl text-black text-center leading-tight font-bold mt-5 pt-6">
          Frequently Asked Questions
        </h3>
        <p className="text-center font-normal  pb-4 pt-3 text-sm text-gray-600">
          Here are some common questions about Yachu Hail Oil, Answered for you
        </p>
        <FAQ />
        <div className="py-20"></div>
      </div>
    </main>
  );
}
