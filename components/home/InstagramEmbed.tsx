"use client";

import React, { useEffect, useRef } from "react";

interface InstagramEmbedProps {
  url: string;
  maxWidth?: number;
}

const InstagramEmbed: React.FC<InstagramEmbedProps> = ({
  url,
  maxWidth = 540, // Default max width
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Function to load Instagram embed script
    const loadInstagramEmbed = () => {
      if ((window as any).instgrm) {
        (window as any).instgrm.Embeds.process();
      } else {
        const script = document.createElement("script");
        script.async = true;
        script.src = "//www.instagram.com/embed.js";
        document.body.appendChild(script);
      }
    };

    // Create and insert the blockquote element
    if (containerRef.current) {
      const blockquote = document.createElement("blockquote");
      blockquote.className = "instagram-media";

      blockquote.setAttribute("data-instgrm-permalink", url);
      blockquote.setAttribute("data-instgrm-version", "14");
      blockquote.style.margin = "1px";
      blockquote.style.maxWidth = `${maxWidth}px`;
      blockquote.style.width = "100%"; // Set full width
      blockquote.style.boxSizing = "border-box"; // To avoid overflow

      containerRef.current.innerHTML = "";
      containerRef.current.appendChild(blockquote);

      // Load the Instagram embed script
      loadInstagramEmbed();
    }
  }, [url, maxWidth]);

  return (
    <div
      ref={containerRef}
      className="w-full mx-auto" // Ensures full width and centers on larger screens
    />
  );
};

export default InstagramEmbed;
