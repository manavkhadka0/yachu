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
    <div className=" bg-gradient-to-r from-lime-700  from-10%  to-lime-900 to-90% text-white  my-10">
      <div className="container mx-auto py-12">
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
                  height={500}
                  width={500}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};
export default Testimonials;
