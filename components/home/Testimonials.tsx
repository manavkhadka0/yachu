
import { useState, useEffect } from "react";
import { TESTIMONIALS } from "@/constants/product";
import Image from "next/image";
import { Button } from "../ui/button";
import { BASE_API_URL } from "@/utils/config";
import { TestimonialType } from "@/types/testi";
import TestimonialsCard from "./TestimonialsCard";

const getTestimonials = async () => {
  try {
    const res = await fetch(`${BASE_API_URL}/testimonials`);
    const data = await res.json();
    return data;
  }
  catch (error) {
    console.log(error);
  }
}

const Testimonials = async () => {
  const testimonial:TestimonialType = await getTestimonials();
  console.log("YO HO",testimonial);
  const { title,name,before,after,rating,source,review} = testimonial;

  return (
    <div className=" bg-gradient-to-r from-lime-700  from-10%  to-lime-900 to-90% text-white ">
      <section className="py-4 bg-white sm:py-16 lg:py-12 xl:py-12">
        <p className=" text-sm  mb-4  md:text-base text-center sm:text-base font-semibold text-amber-600">200+ Happy And Satisfied Yachu Users</p>

        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex flex-col lg:flex-row w-full justify-center items-center mb-8">
            <div className="mx-auto ">
              <h3 className="sm:text-2xl lg:pl-40 font-semibold text-black md:text-5xl text-center ">Don&apos;t just take our words</h3>
            </div>
            <div className=" md:flex-row md:mr-7 ">
              <Button variant={"ghost"} className=" h-7 sm:h-9 w-auto text-black mt-3 md:mt-0 sm:text-lg border-2 border-amber-600 hover:bg-amber-600 hover:text-white  hover:ring-0 focus:ring-0" size={"lg"}>
                View all
              </Button>
            </div>
          </div>
          {/* {testimonial.map((item, index) => (
            <TestimonialsCard testimonial={item} key={index}/>
          ))} */}
          

         
        </div>
      </section>

    </div>
  );
};
export default Testimonials;
