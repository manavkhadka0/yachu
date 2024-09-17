"use client";

import React, { useEffect, useState } from "react";
import Lightbox, { SlideImage } from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import NextJsImage from "../NextJsImage";
import { BASE_API_URL } from "@/utils/config";
import PhotoAlbum from "react-photo-album";
import { Button } from "../ui/button";
import Image from "next/image";
import { randomInt } from "crypto";
import { Link } from "lucide-react";

const getImages = async () => {
  try {
    const response = await fetch(BASE_API_URL + "/image-galleries");
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

type ImageData = {
  id: number;
  title: string;
  image: string;
  created_at: string;
  updated_at: string;
};

type ImagesArray = ImageData[];

const breakpoints = [1080, 640, 384, 256, 128, 96, 64, 48];

const unsplashPhotos = [
  { height: 800 },
  { height: 1620 },
  { height: 720 },
  { height: 721 },
  { height: 1620 },
  { height: 607 },
  { height: 608 },
  { height: 720 },
  { height: 1549 },
  { height: 720 },
  { height: 694 },
  { height: 1620 },
  { height: 720 },
  { height: 1440 },
  { height: 1620 },
  { height: 810 },
  { height: 610 },
  { height: 160 },
  { height: 810 },
  { height: 720 },
  { height: 1440 },
];

const Gallery = () => {
  const [index, setIndex] = React.useState(-1);
  const [pictures, setPictures] = useState<ImagesArray | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      const fetchedImages = await getImages();
      setPictures(fetchedImages);
    };

    fetchImages();
  }, []);

  return (
    <section className="container pb-24 " id="blogsection">
      <div className="flex flex-col md:flex-row justify-center items-center mb-8">
        <div className="mx-auto">
          <h3 className="sm:text-2xl md:pl-40 font-bold text-center uppercase">
            Gallery
          </h3>
        </div>
        <div className="">
          <a href="/gallery">
            <Button
              variant={"outline"}
              className=" h-7 sm:h-9 w-auto mt-3 md:mt-0 sm:text-lg border-2 border-amber-600 hover:bg-amber-600 hover:text-white  hover:ring-0 focus:ring-0"
              size={"lg"}
            >
              View all
            </Button>
          </a>
        </div>
      </div>
      <div className="px-16">
        {pictures && (
          <PhotoAlbum
            layout="rows"
            photos={[...pictures]
              .reverse()
              .slice(0, 8)
              .map((image, index) => ({
                src: image.image,
                width: 1080,
                height: 800,
                srcSet: breakpoints.map((breakpoint) => {
                  const height = Math.round((800 / 1080) * breakpoint);
                  return {
                    src: image.image,
                    width: breakpoint,
                    height,
                  };
                }),
              }))}
            onClick={({ index: current }) => setIndex(current)}
          />
        )}
        {pictures && (
          <Lightbox
            open={index >= 0}
            index={index}
            close={() => setIndex(-1)}
            slides={[...pictures].reverse().map((image) => ({
              src: image.image,
              width: undefined,
              height: undefined,
            }))}
            render={{ slide: NextJsImage }}
          />
        )}
      </div>
    </section>
  );
};

export default Gallery;
