"use client";

import React from 'react';
import LightGallery from "lightgallery/react";
import Link from "next/link";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import { BASE_API_URL, } from '@/utils/config';
import Image from 'next/image';

interface ImageProps {
    id: number;
    title: string;
    image: string;
    updated_at: string;
    created: string;
}

const getImages = async () => {
    try {
        const res = await fetch(`${BASE_API_URL}/image-galleries`, {
            next: { revalidate: 10 },
        });
        const data: ImageProps[] = await res.json();
        return data;
    } catch (error) {
        return null;
    }
};

const Gallery = async () => {

    const images = await getImages();

    const onInit = () => {
        console.log("lightGallery has been initialized");
    };

    if (!images) {
        return null;
    }

    return (

        <>
            {LightGallery ? (
                <LightGallery
                    onInit={onInit}
                    speed={500}
                    plugins={[lgThumbnail, lgZoom]}
                    elementClassNames="lg-container__custom overflow-auto gap-2"
                >
                    <>
                        {images.length > 0 ? (
                            images.map((url, index) => (
                                <a href={`${url}`} key={index} className={`gallery-item ${index === 0 ? 'first-item' : ''} ${index >= 5 ? 'no-img__dis' : ''}`}>
                                    <Image
                                        loader={() => `${url}`}
                                        src={`${url}`}
                                        width={500}
                                        height={index === 0 ? 320 : 207}
                                        className="lg-container__card-image "
                                        alt={`Image ${index + 1}`}
                                    />
                                </a>
                            ))
                        ) : (
                            <p>NO Image</p>
                        )}
                    </>
                </LightGallery >
            ) : (
                <p>Loading...</p>
            )}
        </>


    );
};

export default Gallery;