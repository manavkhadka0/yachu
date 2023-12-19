import { MoveRightIcon } from "lucide-react";
import { Button } from "../../ui/button";
import Image from "next/image";
import { HERO_BEFORE_AFTER } from "@/constants/product";
import { before } from "node:test";

const Hero = () => {
  return (
    <div className="container pt-16 sm:pt-12 md:flex-row flex-col flex gap-2 justify-between md:items-start items-center ">
      <div className="">
        <div className=" flex gap-1 md:gap-6 items-center mb-6 md:justify-start justify-center">
          <div className=" flex flex-col items-center gap-2">
            <Image
              src={"/dandruff.png"}
              alt="dandruff"
              height={200}
              width={200}
              className=" h-12 w-12 md:h-16 md:w-16 lg:h-20  lg:w-20 rounded-full object-cover  "
            />
            <p className="  md:text-xl">Dandruff?</p>
          </div>
          <MoveRightIcon className=" mb-2 " />
          <div className="flex flex-col items-center gap-2">
            <Image
              src={"/before.jpeg"}
              alt="hairfall"
              height={200}
              width={200}
              className=" h-12 w-12 md:h-16 md:w-16 lg:h-20  lg:w-20 rounded-full object-cover  "
            />
            <p className=" md:text-xl font-semibold">Hairfall?</p>
          </div>
          <MoveRightIcon className=" mb-2" />
          <div className=" flex flex-col items-center gap-2">
            <Image
              src={"/baldness.png"}
              alt="baldness"
              height={200}
              width={200}
              className=" h-12 w-12 md:h-16 md:w-16 lg:h-20  lg:w-20 rounded-full object-cover z-[1]  "
            />
            <p className=" md:text-xl font-extrabold">Baldness?</p>
          </div>
        </div>
        <div className=" md:hidden   w-full flex flex-col items-center mb-6">
          <Image
            src={"/person-product.png"}
            alt="curve line"
            height={500}
            width={500}
            className=" max-w-[200px] "
          />
        </div>
        <div className="">
          <p className=" text-xl font-bold mb-2">
            Easy, Affordable and Safe ✅
          </p>
          <h1 className=" text-4xl md:text-5xl lg:text-6xl font-bold">
            Yachu Hair Oil
          </h1>
          <div className=" space-y-2 my-6">
            <p>❌ Dandruff, Hair Loss, Baldness ? Multiple Hair Problems</p>
            <p>🟢 Ultimate Solution = Yachu Hair Oil</p>
            <p>🍃 Crafted with a mix of 33 Jadibuti</p>
            <p>🇳🇵 Made in Nepal</p>
          </div>
        </div>
        <div className=" flex mb-4 flex-wrap gap-4">
          <div className="flex gap-2 sm:gap-6 fle-w">
            <Image
              src={"/comparisons/comparison1.png"}
              alt="Before Yachu"
              height={200}
              width={200}
              className="  w-24 sm:w-32 object-cover  "
            />
            <Image
              src={"/comparisons/comparison2.png"}
              alt="Before Yachu"
              height={200}
              width={200}
              className="  w-24  sm:w-32 object-cover  "
            />
            <Image
              src={"/comparisons/comparison3.png"}
              alt="Before Yachu"
              height={200}
              width={200}
              className="  w-24  sm:w-32 object-cover  "
            />
          </div>
        </div>
        <div className=" flex flex-col gap-1 mb-2">
          <p className=" text-amber-700 text-4xl md:text-6xl  font-extrabold">
            50K +
          </p>
          <p>Hair Problems Solved</p>
        </div>
        <Button
          variant={"outline"}
          className=" flex gap-2 hover:gap-4 transition-all"
        >
          <span className="">Explore More Transformation</span>{" "}
          <MoveRightIcon />
        </Button>
      </div>
      {/* <EmblaCarousel /> */}
      {/* <HeroQuickLinks /> */}
      <div className=" relative lg:flex-1">
        <Image
          src={"/curve-line.svg"}
          alt="curve line"
          height={300}
          width={700}
          className=" w-[600px] xl:w-auto translate-y-6 -translate-x-16 lg:block hidden "
        />
        <div className=" xl:block hidden absolute top-7 left-24 ">
          <Image
            src={"/person.png"}
            alt="curve line"
            height={400}
            width={700}
            className=" w-[220px]      "
          />
          <div className="py-4">
            <p className="text-amber-600 text-lg font-bold">
              पुर्खा को फर्मुला + New Technology
            </p>
          </div>
        </div>
        <div className=" w-full">
          <Image
            src={"/yachu-hero.png"}
            alt="curve line"
            height={500}
            width={500}
            className=" w-[300px] xl:w-[370px]  lg:absolute  xl:top-[180px] top-[100px] right-[6px] md:block hidden  "
          />
        </div>
      </div>
    </div>
  );
};
export default Hero;
