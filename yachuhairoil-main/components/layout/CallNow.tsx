"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Phone, X, MessageCircle, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { yachuWhatsApp, yachuViber } from "@/constants/constant";

interface CallNowButtonProps {
  hasBottomBar?: boolean;
  isMobileBar?: boolean;
}

const CallNowButton = ({ hasBottomBar = false, isMobileBar = false }: CallNowButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOptions = () => setIsOpen(!isOpen);

  const whatsappUrl = `https://api.whatsapp.com/send?phone=${yachuWhatsApp.replace(
    "+",
    "",
  )}&text=Hello%20yachu%20hair%20oil,%20i%20want%20to%20know%20more%20about%20yachu%20hair%20oil%20and%20its%20benefits`;
  const viberUrl = `viber://chat?number=${yachuViber}&text=${encodeURIComponent(
    "Hello yachu hair oil, i want to know more about yachu hair oil and its benefits",
  )}`;

  if (isMobileBar) {
    return (
      <TooltipProvider>
        <div className="relative">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={toggleOptions}
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full w-14 h-14 flex items-center justify-center shadow-lg transition-all duration-300 p-0"
              >
                {isOpen ? <X size={24} /> : <Phone size={24} />}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top" className="mb-2">
              <p>Choose how to contact us</p>
            </TooltipContent>
          </Tooltip>

          {isOpen && (
            <div className="absolute bottom-16 right-0 flex flex-col space-y-3 animate-in slide-in-from-bottom-2 duration-200 z-50">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    asChild
                    size="lg"
                    className="bg-green-500 hover:bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg transition-all duration-300 p-0"
                  >
                    <Link
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle size={20} />
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="left" className="mr-2">
                  <p>Chat on WhatsApp</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    asChild
                    size="lg"
                    className="bg-purple-600 hover:bg-purple-700 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg transition-all duration-300 p-0"
                  >
                    <Link
                      href={viberUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Smartphone size={20} />
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="left" className="mr-2">
                  <p>Chat on Viber</p>
                </TooltipContent>
              </Tooltip>
            </div>
          )}
        </div>
      </TooltipProvider>
    );
  }

  return (
    <TooltipProvider>
      <div className="fixed z-50 transition-all duration-300 bottom-4 left-72 md:bottom-6 md:right-6 md:left-auto hidden md:block">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={toggleOptions}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full p-4 shadow-lg transition-all duration-300 h-auto w-auto"
            >
              {isOpen ? <X size={24} /> : <Phone size={24} />}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top" className="mb-2">
            <p>Call Now</p>
          </TooltipContent>
        </Tooltip>

        {isOpen && (
          <div className="absolute bottom-16 right-0 flex flex-col space-y-3 animate-in slide-in-from-bottom-2 duration-200">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  asChild
                  size="lg"
                  className="bg-green-500 hover:bg-green-600 text-white rounded-full p-3 shadow-lg transition-all duration-300 h-auto w-auto"
                >
                  <Link
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle size={20} className="mr-2" />
                    <span className="text-sm font-medium">WhatsApp</span>
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left" className="mr-2">
                <p>Chat on WhatsApp</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  asChild
                  size="lg"
                  className="bg-purple-600 hover:bg-purple-700 text-white rounded-full p-3 shadow-lg transition-all duration-300 h-auto w-auto"
                >
                  <Link
                    href={viberUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Smartphone size={20} className="mr-2" />
                    <span className="text-sm font-medium">Viber</span>
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left" className="mr-2">
                <p>Chat on Viber</p>
              </TooltipContent>
            </Tooltip>
          </div>
        )}
      </div>
    </TooltipProvider>
  );
};

export default CallNowButton;
