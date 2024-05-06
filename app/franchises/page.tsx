"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import { BASE_API_URL } from "@/utils/config";

// Assuming FranchiseData type matches the structure of the data returned from the API
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

// Assuming ContentItem type matches the structure of the content you want to display
type ContentItem = {
  title: string;
  description: string;
  content: JSX.Element;
};

const dummy_content = [
  {
    title: "Collaborative Editing",
    description:
      "Work together in real time with your team, clients, and stakeholders. Collaborate on documents, share ideas, and make decisions quickly. With our platform, you can streamline your workflow and increase productivity.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
        Collaborative Editing
      </div>
    ),
  },
  {
    title: "Real time changes",
    description:
      "See changes as they happen. With our platform, you can track every modification in real time. No more confusion about the latest version of your project. Say goodbye to the chaos of version control and embrace the simplicity of real-time updates.",
    content: (
      <div className="h-full w-full  flex items-center justify-center text-white">
        <Image
          src="/logo.jpg"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="linear board demo"
        />
      </div>
    ),
  },
  {
    title: "Version control",
    description:
      "Experience real-time updates and never stress about version control again. Our platform ensures that you're always working on the most recent version of your project, eliminating the need for constant manual updates. Stay in the loop, keep your team aligned, and maintain the flow of your work without any interruptions.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] flex items-center justify-center text-white">
        Version control
      </div>
    ),
  },
  {
    title: "Running out of content",
    description:
      "Experience real-time updates and never stress about version control again. Our platform ensures that you're always working on the most recent version of your project, eliminating the need for constant manual updates. Stay in the loop, keep your team aligned, and maintain the flow of your work without any interruptions.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
        Running out of content
      </div>
    ),
  },
];

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
            <div className="h-full w-full  flex items-center justify-center text-white">
              <Image
                src={item.image}
                width={300}
                height={300}
                className="h-full w-full object-cover"
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
    <div className="container pb-14">
      {content && <StickyScroll content={content} />}
    </div>
  );
}
