"use client";

import NextJsImage from "@/components/NextJsImage";
import { ParallaxScroll } from "@/components/ui/parallax-scroll";
import { BASE_API_URL } from "@/utils/config";
import React, { useEffect, useState } from "react";
import Lightbox from "yet-another-react-lightbox";


type ImageData = {
  id: number;
  title: string;
  image: string;
  created_at: string;
  updated_at: string;
};

type ImagesArray = ImageData[];

const getImages = async () => {
  try {
    const response = await fetch(BASE_API_URL + '/image-galleries');
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

const ParallaxScrollDemo = () => {
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
    <>
      <div className="container ">
        {pictures && (
          <><ParallaxScroll header="dsaa" images={[...pictures].reverse().map((image, index) => {
            return (image.image);
          })} />
            <Lightbox
              open={index >= 0}
              index={index}
              close={() => setIndex(-1)}
              slides={[...pictures].reverse().map(image => ({
                src: image.image,
                width: undefined,
                height: undefined,
              }))}
              render={{ slide: NextJsImage }} /></>
        )}
      </div>
    </>
  );
}
export default ParallaxScrollDemo;