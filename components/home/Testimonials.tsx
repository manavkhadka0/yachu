"use client";

import { useViewportSize } from "@/hooks/viewport";
import { useState, useEffect } from "react";

import { Navigation } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

import "swiper/css";
import "../../styles/swiper.css";

import { TESTIMONIALS } from "@/constants/product";
import Image from "next/image";
import { Button } from "../ui/button";

const Testimonials = () => {
  const [slideCount, setSlideCount] = useState(4);
  const viewport = useViewportSize();

  useEffect(() => {
    if (viewport === "lg") {
      setSlideCount(4);
    }
    if (viewport === "sm") {
      setSlideCount(1);
    }
    if (viewport === "md") {
      setSlideCount(2);
    }
  }, [viewport]);

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
          

          <div className="grid max-w-3xl grid-cols-1 gap-12 mx-auto md:mt-16 mt-8 text-center lg:mt-12 xl:mt-12 xl:grid-cols-2 xl:max-w-none sm:text-left">
            <div className="flex flex-col sm:flex-row bg-amber-700 p-8 shadow-2xl rounded-3xl lg:items-center">
              <img className="object-cover w-48 h-48 mx-auto sm:mx-0 lg:w-60 lg:h-60 shrink-0 rounded-2xl" src="https://landingfoliocom.imgix.net/store/collection/saasui/images/testimonial/4/woman.png" alt="" />
              <div className="mt-8 sm:mt-0 sm:ml-10">
                <div className="flex items-center justify-center sm:justify-start">
                  <svg className="w-5 h-5 text-amber-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    />
                  </svg>
                  <svg className="w-5 h-5 text-amber-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    />
                  </svg>
                  <svg className="w-5 h-5 text-amber-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    />
                  </svg>
                  <svg className="w-5 h-5 text-amber-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    />
                  </svg>
                  <svg className="w-5 h-5 text-amber-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    />
                  </svg>
                </div>
                <blockquote className="mt-8">
                  <p className="text-lg font-medium leading-8 text-gray-200">&quot;We love Yachu! Our users were using it for their projects, so we already knew what kind of design they want.&quot;</p>
                </blockquote>
                <div className="flex flex-col flex-wrap items-center justify-center gap-1 mt-5 sm:flex-row sm:justify-start sm:gap-4">
                  <p className="text-base font-semibold text-gray-200">Jenny Wilson</p>
                  <p className="text-base font-normal text-gray-300">Grower.io</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:items-center">
              <img className="object-cover w-48 h-48 mx-auto sm:mx-0 lg:w-60 lg:h-60 shrink-0 rounded-2xl" src="https://landingfoliocom.imgix.net/store/collection/saasui/images/testimonial/4/man.png" alt="" />
              <div className="mt-8 sm:mt-0 sm:ml-10">
                <div className="flex items-center justify-center sm:justify-start">
                  <svg className="w-5 h-5 text-amber-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    />
                  </svg>
                  <svg className="w-5 h-5 text-amber-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    />
                  </svg>
                  <svg className="w-5 h-5 text-amber-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    />
                  </svg>
                  <svg className="w-5 h-5 text-amber-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    />
                  </svg>
                  <svg className="w-5 h-5 text-amber-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    />
                  </svg>
                </div>
                <blockquote className="mt-8">
                  <p className="text-lg font-medium leading-8 text-gray-900">&quot;Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint sit quibusdam distinctio libero recusandae maiores enim ex reiciendis accusamus .&quot;</p>
                </blockquote>
                <div className="flex flex-col flex-wrap items-center justify-center gap-1 mt-5 sm:flex-row sm:justify-start sm:gap-4">
                  <p className="text-base font-semibold text-gray-900">Devon Lane</p>
                  <p className="text-base font-normal text-gray-600">DLDesign.co</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <div className="container mx-auto py-12">
        <h2 className="text-2xl text-center uppercase font-bold mb-10">
          Testimonials
        </h2>
        <div className="">
          <Swiper
            slidesPerView={slideCount}
            spaceBetween={80}
            navigation={true}
            modules={[Navigation]}
            className="mySwiper"
            style={{
              paddingLeft: "60px",
              paddingRight: "60px",
              overflow: "hidden",
            }}
          >
            {TESTIMONIALS.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <Image
                  src={testimonial}
                  alt="testimonial"
                  height={700}
                  width={700}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div> */}
    </div>
  );
};
export default Testimonials;
