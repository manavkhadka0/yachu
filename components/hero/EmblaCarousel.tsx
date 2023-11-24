"use client";
import React from "react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import "../../styles/embla.css";
import BannerImg from "../../public/banner.jpg";
import useEmblaCarousel from "embla-carousel-react";

export const SLIDES = [
  {
    image: BannerImg,
    title: "Lorem ipsum dolor sit amet",
    subtitle:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ullamcorper ligula in auctor auctor. Aenean bibendum aliquam molestie. Cras mattis molestie urna eget laoreet. ",
  },
  {
    image: BannerImg,
    title: "Lorem ipsum dolor sit amet",
    subtitle:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ullamcorper ligula in auctor auctor. Aenean bibendum aliquam molestie. Cras mattis molestie urna eget laoreet. ",
  },
];

const EmblaCarousel = () => {
  const [emblaRef] = useEmblaCarousel({}, [Autoplay()]);

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container ">
          {SLIDES.map(({ image, title, subtitle }, index) => (
            <div className="embla__slide relative" key={index}>
              <Image
                className="embla__slide__img"
                src={image}
                alt="banner_img"
                width={1000}
                height={600}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmblaCarousel;
