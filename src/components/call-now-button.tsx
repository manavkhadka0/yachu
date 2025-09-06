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

const CallNowButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOptions = () => setIsOpen(!isOpen);

  const whatsappUrl = `https://api.whatsapp.com/send?phone=${yachuWhatsApp.replace(
    "+",
    ""
  )}&text=Hello%20yachu%20hair%20oil,%20i%20want%20to%20know%20more%20about%20yachu%20hair%20oil%20and%20its%20benefits`;
  const viberUrl = `viber://chat?number=${yachuViber}&text=${encodeURIComponent(
    "Hello yachu hair oil, i want to know more about yachu hair oil and its benefits"
  )}`;

  return (
    <TooltipProvider>
      <div className="fixed bottom-6 right-6 z-50">
        {/* Desktop: Circular button with dropdown */}
        <div className="hidden md:block">
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

          {/* Dropdown options */}
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

        {/* Mobile: Long button with dropdown */}
        <div className="md:hidden">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={toggleOptions}
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6 py-3 shadow-lg transition-all duration-300 h-auto w-auto"
              >
                {isOpen ? <X size={20} /> : <Phone size={20} />}
                <span className="text-sm font-medium ml-2">
                  {isOpen ? "Close" : "Call Now"}
                </span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top" className="mb-2">
              <p>Choose how to contact us</p>
            </TooltipContent>
          </Tooltip>

          {/* Dropdown options for mobile */}
          {isOpen && (
            <div className="absolute bottom-16 right-0 flex flex-col space-y-3 animate-in slide-in-from-bottom-2 duration-200">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    asChild
                    size="lg"
                    className="bg-green-500 hover:bg-green-600 text-white rounded-full px-4 py-3 shadow-lg transition-all duration-300 h-auto w-auto"
                  >
                    <Link
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle size={18} className="mr-2" />
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
                    className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-4 py-3 shadow-lg transition-all duration-300 h-auto w-auto"
                  >
                    <Link
                      href={viberUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Smartphone size={18} className="mr-2" />
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
      </div>
    </TooltipProvider>
  );
};

export default CallNowButton;
