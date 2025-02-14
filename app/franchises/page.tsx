"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import { BASE_API_URL } from "@/utils/config";

// FranchiseData type matches the structure of the data returned from the API
type FranchiseData = {
  id: number;
  franchise_name: string;
  email: string;
  phone: number;
  description: string;
  address: string;
  city: string;
  state: string;
  country: string;
  image: string;
  created_at: string;
  updated_at: string;
};

// ContentItem type matches the structure of the content you want to display
type ContentItem = {
  title: string;
  description: string;
  content: JSX.Element;
};

export default function StickyScrollRevealDemo() {
  const [content, setContent] = useState<ContentItem[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${BASE_API_URL}/franchise`);
        if (!res.ok) throw new Error("Network response was not ok");
        const data: FranchiseData[] = await res.json();
        // Transform the fetched data into the desired content format
        const transformedContent = data.map((item) => ({
          title: item.franchise_name,
          description: item.description,
          content: (
            <div className="h-full w-full flex items-center justify-center text-white">
              <Image
                src={item.image}
                width={300}
                height={300}
                className="h-full w-full object-cover sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4" // Responsive image size
                alt="linear board demo"
              />
            </div>
          ),
        }));
        setContent(transformedContent);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container pb-14 px-4 sm:px-6 lg:px-8">
      {content && <StickyScroll content={content} />}
    </div>
  );
}
