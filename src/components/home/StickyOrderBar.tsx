"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { HERO_OFFER } from "@/constants/offers";

interface StickyOrderBarProps {
  onOrder: (source: string) => void;
}

/* Mobile-only order bar that appears once the hero button has scrolled away */
const StickyOrderBar = ({ onOrder }: StickyOrderBarProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const pastHero = window.scrollY > 600;
      const nearFooter =
        window.innerHeight + window.scrollY >
        document.documentElement.scrollHeight - 300;
      setVisible(pastHero && !nearFooter);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Tells the floating call button to move up out of the way (see globals.css)
  useEffect(() => {
    document.body.dataset.stickyCta = String(visible);
    return () => {
      delete document.body.dataset.stickyCta;
    };
  }, [visible]);

  return (
    <div
      aria-hidden={!visible}
      className={`fixed inset-x-0 bottom-0 z-40 border-t bg-white/95 px-4 py-3 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] backdrop-blur transition-transform duration-300 md:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-xs font-medium text-muted-foreground">
            {HERO_OFFER.name} · Cash on Delivery
          </p>
          <p className="text-lg font-extrabold leading-tight text-foreground">
            Rs. {HERO_OFFER.price.toLocaleString()}{" "}
            <span className="text-xs font-medium text-muted-foreground line-through">
              Rs. {HERO_OFFER.originalPrice.toLocaleString()}
            </span>
          </p>
        </div>
        <Button
          tabIndex={visible ? 0 : -1}
          onClick={() => onOrder("sticky_bar")}
          className="h-12 shrink-0 rounded-full px-6 text-base font-bold shadow-md shadow-primary/30"
        >
          Order Now
        </Button>
      </div>
    </div>
  );
};

export default StickyOrderBar;
