"use client";

import React, { useEffect, useRef } from "react";

declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process: () => void;
      };
    };
  }
}

interface InstagramEmbedProps {
  url: string;
  maxWidth?: number;
}

const InstagramEmbed: React.FC<InstagramEmbedProps> = ({
  url,
  maxWidth = 540,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadInstagramEmbed = () => {
      if (window.instgrm) {
        window.instgrm.Embeds.process();
      } else {
        const script = document.createElement("script");
        script.async = true;
        script.src = "//www.instagram.com/embed.js";
        document.body.appendChild(script);
      }
    };

    if (containerRef.current) {
      const blockquote = document.createElement("blockquote");
      blockquote.className = "instagram-media";
      blockquote.setAttribute("data-instgrm-permalink", url);
      blockquote.setAttribute("data-instgrm-version", "14");
      blockquote.style.margin = "1px";
      blockquote.style.maxWidth = `${maxWidth}px`;
      blockquote.style.width = "100%";
      blockquote.style.boxSizing = "border-box";

      containerRef.current.innerHTML = "";
      containerRef.current.appendChild(blockquote);

      loadInstagramEmbed();
    }
  }, [url, maxWidth]);

  return (
    <div
      ref={containerRef}
      className="w-full mx-auto"
    />
  );
};

export default InstagramEmbed;
