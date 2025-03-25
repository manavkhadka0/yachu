import ContactForm from "@/components/contact/ContactForm";
import FAQ from "@/components/contact/FAQ";
import FlowerDivider from "@/components/shared/FlowerDivider";
import InstagramEmbed from "@/components/home/InstagramEmbed";
import YachuWomen from "@/components/home/YachuWomen";
import { OUR_TEAM } from "@/constants/about";
import OurTeam from "@/components/home/about-us/OurTeam";
import About from "@/components/home/about-us/About";
import StickyScrollRevealDemo from "../franchises/page";

export default async function Home() {
  return (
    <main className="flex flex-col ">
      <About aboutdetails={[]} />

      <p className="text-4xl pt-10 mb-4 text-center font-bold text-black">
        50K+ Happy And Satisfied Yachu Users
      </p>
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 py-20 pb-40">
        <InstagramEmbed url="https://www.instagram.com/p/C-PhVnuAgj6/" />
        <InstagramEmbed url="https://www.instagram.com/p/C-PhjiBA_lp/" />
        <InstagramEmbed url="https://www.instagram.com/p/C_47iTVor2a/" />
        <InstagramEmbed url="https://www.instagram.com/p/C_46Dk2I1gl/" />
      </div>

      <FlowerDivider />

      <OurTeam teams={OUR_TEAM} />

      <YachuWomen />
    </main>
  );
}
