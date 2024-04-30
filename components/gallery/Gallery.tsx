import React from "react";
import Image from "next/image";
import { Button } from "../ui/button";

const gallery = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-12">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-center items-center mb-8">
          <div className="mx-auto">
            <h3 className="sm:text-2xl md:pl-40 font-bold text-center uppercase">
              Gallery
            </h3>
          </div>
          <div className=" md:flex-row md:mr-7">
            <Button
              variant={"ghost"}
              className=" h-7 sm:h-9 w-auto mt-3 md:mt-0 sm:text-lg border-2 border-amber-600 hover:bg-amber-600 hover:text-white  hover:ring-0 focus:ring-0"
              size={"lg"}
            >
              <a href="/components/gallery/GallerySection.tsx"></a>
              View all
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center lg:pl-16 gap-10 pb-24 mt-12 lg:flex-row sm:mt-16">
        <div className="relative shrink-0 px-auto">
          <img
            className="h-auto w-[280px]"
            src="https://landingfoliocom.imgix.net/store/collection/niftyui/images/gallery/2/image-2.png"
            alt=""
          />
        </div>

        <div className="relative shrink-0 first:pl-6 last:pr-6">
          <img
            className="h-auto w-[280px]"
            src="https://landingfoliocom.imgix.net/store/collection/niftyui/images/gallery/2/image-2.png"
            alt=""
          />
        </div>

        <div className="relative  shrink-0 first:pl-6 last:pr-6">
          <img
            className="h-auto w-[280px]"
            src="https://landingfoliocom.imgix.net/store/collection/niftyui/images/gallery/2/image-3.png"
            alt=""
          />
        </div>

        <div className="relative shrink-0 first:pl-6 last:pr-6">
          <img
            className="h-auto w-[280px]"
            src="https://landingfoliocom.imgix.net/store/collection/niftyui/images/gallery/2/image-4.png"
            alt=""
          />
        </div>
      </div>
    </section>
  );
};

export default gallery;
