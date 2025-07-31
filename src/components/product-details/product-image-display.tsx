"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface ProductImageDisplayProps {
  image: string;
  title: string;
}

export const ProductImageDisplay = ({
  image,
  title,
}: ProductImageDisplayProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="lg:max-w-lg lg:self-start lg:sticky lg:top-8 px-2 xs:px-3 sm:px-4 lg:px-0">
      <Card className="border-0 shadow-lg">
        <CardContent className="p-2 xs:p-3 sm:p-4">
          <div className="aspect-square xs:aspect-h-4 xs:aspect-w-3 relative">
            {!imageLoaded && (
              <Skeleton className="absolute inset-0 rounded-lg" />
            )}
            <Image
              src={image}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className={`object-contain rounded-lg transition-opacity duration-300 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              priority
              onLoad={() => setImageLoaded(true)}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
