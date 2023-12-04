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

export default function Home() {
  return (
    <main className="flex flex-col ">
      <Hero />

      <FlowerDivider />

      {/* ------------ Products ------------*/}
      <ProductShowcase />
      <Ingredients />
      {/* ---------------------------------- */}

      <FlowerDivider />

      {/* --------- About Yachu ------------*/}
      <About />
      <Questions />
      <OurTeam />
      {/* ---------------------------------- */}

      <FlowerDivider />

      <YachuWomen />
      {/* <VideoShowcase /> */}
      <FlowerDivider />
      <div className="container mb-20 mt-10">
        <div className=" flex justify-center flex-col max-w-3xl mx-auto mb-16">
          <h3 className="sm:text-2xl font-bold  uppercase text-center">
            Contact Yachu
          </h3>
          <ContactForm />
        </div>
        <h3 className="sm:text-2xl text-xl font-bold">FAQs</h3>
        <FAQ />
      </div>
    </main>
  );
}
