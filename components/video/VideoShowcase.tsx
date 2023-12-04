"use client";
import "../../styles/swiper.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { FreeMode, Navigation, Pagination } from "swiper/modules";

const VIDEOS = [
  "https://www.youtube.com/embed/WP-tdve6BrY",
  "https://www.youtube.com/embed/WP-tdve6BrY",
  "https://www.youtube.com/embed/WP-tdve6BrY",
  "https://www.youtube.com/embed/WP-tdve6BrY",
  "https://www.youtube.com/embed/WP-tdve6BrY",
  "https://www.youtube.com/embed/WP-tdve6BrY",
  ,
];

const VideoShowcase = () => {
  return (
    <div className=" my-12 container ">
      <Swiper
        slidesPerView={4}
        spaceBetween={5}
        pagination={{
          clickable: true,
          el: ".swiper-pagination",
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
        style={{
          paddingBottom: "40px",
        }}
      >
        {VIDEOS.map((video, index) => (
          <SwiperSlide key={index}>
            <iframe
              height="580"
              src={video}
              title="Yachu Hair Oil"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            ></iframe>
          </SwiperSlide>
        ))}
        <div className="swiper-pagination" style={{}} />{" "}
        {/* Customize pagination color here */}
      </Swiper>
    </div>
  );
};
export default VideoShowcase;
