"use client";

import React from 'react';
import LightGallery from "lightgallery/react";
import Link from "next/link";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import { BASE_API_URL,  } from '@/utils/config';

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
        <div className="my-3 grid grid-cols-1  gap-3">
            <LightGallery onInit={onInit} speed={500} plugins={[lgThumbnail, lgZoom]}>
                {images.slice(0, 10).map((image, no) => (
                        <Link
                            href={`${image.image || ''}`} // Handle undefined image.image
                            className={`relative grid-item${no + 1}`}
                            key={no}
                        >
                            <img
                                alt={image.title}
                                className="w-60 h-auto rounded-lg object-cover lazy"
                                src={`${image.image || ''}`} // Handle undefined image.image
                            />
                        </Link>
                    ))}
            </LightGallery>
        </div>


    );
};

export default Gallery;