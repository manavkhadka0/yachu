"use client";
import { useState, useEffect } from "react";
import { TESTIMONIALS } from "@/constants/product";
import Image from "next/image";
import { Button } from "../ui/button";
import { BASE_API_URL, BASE_URL } from "@/utils/config";
import { TestimonialType } from "@/types/testi";
import TestimonialsCard from "./TestimonialsCard";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const images = [
  "https://images.unsplash.com/photo-1549989476-69a92fa57c36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1549396535-c11d5c55b9df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1550133730-695473e544be?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1550167164-1b67c2be3973?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1550338861-b7cfeaf8ffd8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1550223640-23097fc71cb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1550353175-a3611868086b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1550330039-a54e15ed9d33?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1549737328-8b9f3252b927?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1549833284-6a7df91c1f65?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1549985908-597a09ef0a7c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1550064824-8f993041ffd3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
];
const texts = [
  "Appending currency sign to a purchase form in your e-commerce site using plain JavaScript.",
  "Fixing CSS load order/style.chunk.css incorrect in Nextjs",
  "React Carousel with Server Side Rendering Support – Part 1",
  "React Carousel with Server Side Rendering Support – Part 2",
  "Flutter Xcode couldn’t find any iOS App Development provisioning profiles",
];

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 2,
    partialVisibilityGutter: 40,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
    partialVisibilityGutter: 40,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
    partialVisibilityGutter: 40,
  },
};

const fakerData = Array(12).fill(0).map((item, index) => {
  return {
    image: images[index],
    headline: "w3js -> web front-end studio",
    description: texts[index] || texts[0],
  };
});

const getTestimonials = async () => {
  try {
    const res = await fetch(`${BASE_API_URL}/testimonials`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const Testimonials = () => {
  return (
    <div className=" bg-gradient-to-r from-lime-700  from-10%  to-lime-900 to-90% text-white ">
      <section className="py-4 bg-white sm:py-16 lg:py-12 xl:py-12">
        <p className=" text-sm  mb-4  md:text-base text-center sm:text-base font-semibold text-amber-600">
          200+ Happy And Satisfied Yachu Users
        </p>

        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex flex-col lg:flex-row w-full justify-center items-center mb-8">
            <div className="mx-auto ">
              <h3 className="sm:text-2xl lg:pl-40 font-semibold text-black md:text-5xl text-center ">
                Don&apos;t just take our words
              </h3>
            </div>
            <div className=" md:flex-row md:mr-7 ">
              <Button
                variant={"ghost"}
                className=" h-7 sm:h-9 w-auto text-black mt-3 md:mt-0 sm:text-lg border-2 border-amber-600 hover:bg-amber-600 hover:text-white  hover:ring-0 focus:ring-0"
                size={"lg"}
              >
                View all
              </Button>
            </div>
          </div>

          <Carousel
            swipeable={false}
            draggable={false}
            responsive={responsive}
            ssr
            infinite={true}
            containerClass="first-carousel-container container"
            className="pt-8"
          >
            {fakerData.map((card, index) => {
              return (
                <div
                  key={index}
                  className=" flex gap-4 flex-col md:flex-row mx-8 p-4 bg-slate-200 rounded-2xl  md:items-start"
                >
                  <Image
                    height={192}
                    width={192}
                    className="object-cover mx-auto sm:mx-0 lg:w-60 lg:h-60 shrink-0 rounded-2xl"
                    src={card.image}
                    alt=""
                  />
                  <div className="">
                    <div className=" flex flex-col justify-start gap-1 mt-5">
                      <p className="text-base font-semibold text-gray-900">
                        { }</p>
                      <p className="text-base font-normal text-gray-600">
                        {card.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </Carousel>

          {/* <Carousel
            swipeable={false}
            draggable={false}
            responsive={responsive}
            ssr
            showDots
            infinite
            containerClass="container-with-dots"
            itemClass="image-item"
          >
            {fakerData.slice(0, 5).map(card => {
              return <Image src={card.image} alt={card.headline} />;
            })}
          </Carousel>
          <div>Item 1</div>
          <div>Item 2</div>
          <div>Item 3</div>
          <div>Item 4</div> */}
          {/* {testimonial.map((item, index) => (
            <TestimonialsCard testimonial={item} key={index}/>
          ))} */}
        </div>
      </section>
    </div>
  );
};
export default Testimonials;
