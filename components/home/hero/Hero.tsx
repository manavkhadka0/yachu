import { MoveRightIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const Hero = () => {
  return (
    <div className="container px-6 pt-0 md:pt-2 lg:px-12 xl:px-20 xl:py-20  md:flex-row flex-col flex justify-between md:items-start items-center">
      <div className="pb-24 flex flex-col flex-1 justify-center w-full">
        <h1 className="block xl:py-6 xl:hidden text-5xl md:text-6xl lg:text-7xl lg:w-fit xl:text-9xl font-bold">
          <p className="text-[#B45309] font-bold">Yachu </p>Hair Oil
        </h1>
        <h1 className="hidden xl:block text-5xl md:text-5xl lg:text-7xl font-bold">
          <span className="text-[#B45309] font-bold">Yachu </span>
          Hair Oil
        </h1>
        <div className=" space-y-2 my-4">
          <p className="font-semibold text-base md:text-lg xl:text-2xl xl:p-1 text-gray-700">
            ❌ Dandruff, Hair Loss, Baldness ?{" "}
          </p>
          <p className="font-semibold text-base md:text-lg xl:text-2xl xl:p-1 text-gray-700">
            🟢 Ultimate Solution = Yachu Hair Oil
          </p>
          <p className="font-semibold text-base md:text-lg xl:text-2xl xl:p-1 text-gray-700">
            🍃 Crafted with a mix of 33 Jadibuti
          </p>
          <p className="font-semibold text-base md:text-lg xl:text-2xl xl:p-1 text-gray-700">
            ✅ Easy, Affordable and Safe
          </p>
        </div>

        <div className="md:hidden flex gap-1 md:gap-3 lg:gap-2 items-center mb-4 md:justify-start ">
          <div className=" flex flex-col items-center gap-3">
            <Image
              src={"/dandruff.png"}
              alt="dandruff"
              height={200}
              width={200}
              priority
              className=" h-12 w-12 md:h-16 md:w-16 lg:h-16 lg:w-16 rounded-full object-cover  "
            />
            <p className="  md:text-xl font-semibold">Dandruff?</p>
          </div>
          <MoveRightIcon className=" mb-2 " />
          <div className="flex flex-col items-center gap-2">
            <Image
              src={"/before.jpeg"}
              alt="hairfall"
              height={200}
              width={200}
              className=" h-12 w-12 md:h-16 md:w-16 lg:h-16 lg:w-16 rounded-full object-cover  "
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
              className=" h-12 w-12 md:h-16 md:w-16 lg:h-16 lg:w-16 rounded-full object-cover z-[1]  "
            />
            <p className=" md:text-xl font-semibold">Baldness?</p>
          </div>
        </div>
        <div className=" flex flex-col gap-1 mb-2">
          <p className=" text-amber-700 border-3 border-black-800 text-4xl md:text-6xl xl:text-7xl xl:py-3 font-extrabold fill-none stroke-black">
            50K +
          </p>
          <p className="font-semibold text-gray-600 xl:text-xl">
            Hair Problems Solved
          </p>
        </div>
        <Link
          href={"/products"}
          className="mt-6 group relative overflow-hidden w-full sm:max-w-xs md:w-fit bg-gradient-to-r from-amber-700 to-amber-600 text-white font-semibold text-base sm:text-lg rounded-full shadow-xl hover:shadow-amber-200/50 transition-all duration-300 flex items-center justify-center py-2 sm:py-3 px-4 sm:px-6 border-2 border-amber-600"
        >
          <span className="absolute inset-0 bg-white/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>
          <div className="relative flex items-center justify-center gap-2 w-full">
            <span className="text-center text-sm sm:text-base md:text-lg xl:text-xl whitespace-nowrap">
              Order Yachu Hair Oil Now
            </span>
            <MoveRightIcon className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 transition-transform group-hover:translate-x-1" />
          </div>
        </Link>
      </div>
      <div className=" w-auto pt-9 justify-end md:flex hidden">
        <Image
          src={"/1024.png"}
          alt="curve line"
          height={550}
          width={550}
          className=" "
        />
      </div>
    </div>
  );
};
export default Hero;
