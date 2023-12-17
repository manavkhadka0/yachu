"use client";

import { Pagination } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import "swiper/css";
import "../../../styles/swiper.css";
import { useViewportSize } from "@/hooks/viewport";
import { useEffect, useState } from "react";
import { VIDEOS } from "@/constants/product";

const VideoShowcase = () => {
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
    <div className="container">
      <Swiper
        slidesPerView={slideCount}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
        style={{ paddingBottom: "60px" }}
      >
        {VIDEOS.map((video, index) => (
          <SwiperSlide key={index}>
            <iframe
              width="100%"
              height="580"
              src={video}
              title="Yachu Hair Oil "
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
export default VideoShowcase;
