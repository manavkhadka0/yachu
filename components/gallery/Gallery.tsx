'use client';

import React, { useEffect, useState } from 'react';
import Lightbox, { SlideImage } from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import NextJsImage from '../NextJsImage';
import { BASE_API_URL } from '@/utils/config';
import PhotoAlbum from 'react-photo-album';
import { Button } from '../ui/button';
import Image from 'next/image';

const getImages = async () => {
    try {
        const response = await fetch(BASE_API_URL + '/image-galleries');
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

type ImageData = {
    id: number;
    title: string;
    image: string;
    created_at: string;
    updated_at: string;
};

type ImagesArray = ImageData[];

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
        <section className="container pb-24" id="blogsection">
            <div className="flex flex-col md:flex-row justify-center items-center mb-8">
                <div className="mx-auto">
                    <h3 className="sm:text-2xl md:pl-40 font-bold text-center uppercase">
                        Gallery
                    </h3>
                </div>
                <div className="">
                    <Button
                        variant={"outline"}
                        className=" h-7 sm:h-9 w-auto mt-3 md:mt-0 sm:text-lg border-2 border-amber-600 hover:bg-amber-600 hover:text-white  hover:ring-0 focus:ring-0"
                        size={"lg"}
                    >
                        View all
                    </Button>
                </div>
            </div>

            {pictures && <PhotoAlbum
                layout="masonry"
                photos={pictures.map((image) => ({
                    src: image.image,
                    width: 900,
                    height: 900,
                }))}
                targetRowHeight={150}
                onClick={({ index: current }) => setIndex(current)}

            />}
            {pictures && (
                <Lightbox
                    open={index >= 0}
                    close={() => setIndex(-1)}
                    slides={pictures.map(image => ({
                        src: image.image,
                        width: undefined,
                        height: undefined,
                    }))}
                    render={{ slide: NextJsImage }}
                />
            )}
        </section>
    );
}

export default Gallery;
