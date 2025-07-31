"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { yachuWhatsApp } from "@/constants/constant";

const WhatsAppButton = () => {
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${yachuWhatsApp.replace(
    "+",
    ""
  )}&text=Hello%20yachu%20hair%20oil,%20i%20want%20to%20know%20more%20bout%20yachu%20hair%20oil%20and%20its%20benifits`;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            asChild
            size="lg"
            className="fixed bottom-3 right-14 bg-secondary hover:bg-secondary/80 text-foreground rounded-full p-3 shadow-lg transition-colors duration-300 h-auto w-auto"
          >
            <Link href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <img
                src="/whatsapp.png"
                alt="WhatsApp icon"
                width="40"
                height="40"
                className="w-10 h-10"
              />
            </Link>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="top" className="mb-2">
          <p>Contact us on WhatsApp</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default WhatsAppButton;
