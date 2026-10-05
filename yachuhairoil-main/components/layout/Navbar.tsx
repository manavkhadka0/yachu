"use client";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useState, useEffect, forwardRef, useRef } from "react";
import Link from "next/link";
import { useCartStore } from "@/hooks/useCartStore";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import ProductCart from "@/components/product/ProductCart";
import { getTotalCount } from "@/lib/utils";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return isMobile;
}

const CartButton = forwardRef<HTMLButtonElement>((props, ref) => {
  const { cart } = useCartStore();
  return (
    <button
      ref={ref}
      {...props}
      data-cart-icon
      className="relative p-2 rounded-full hover:bg-muted transition-colors text-foreground cursor-pointer"
      aria-label="Open cart"
    >
      <ShoppingBag className="w-6 h-6 text-forest" />
      {cart.length > 0 && (
        <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gold text-white text-[10px] font-bold flex items-center justify-center border-2 border-background">
          {getTotalCount(cart)}
        </span>
      )}
    </button>
  );
});
CartButton.displayName = "CartButton";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const isMobile = useIsMobile();
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "Story" },
    { href: "/how-to-use", label: "How to Use" },
    { href: "/ingredients", label: "Ingredients" },
    { href: "/products", label: "Shop" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/85 border-b border-border"
    >
      <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <img
            src="/yachuoillogo.webp"
            alt="Logo"
            className="h-16 w-auto object-contain"
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-7 text-sm text-foreground/75 font-medium">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="hover:text-forest transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {isMobile ? (
            <Drawer open={isCartOpen} onOpenChange={setIsCartOpen}>
              <DrawerTrigger asChild>
                <CartButton />
              </DrawerTrigger>
              <DrawerContent
                className="focus:outline-none flex flex-col"
                style={{ maxHeight: "95dvh" }}
              >
                <div className="flex justify-between items-center px-6 pt-6 pb-4 shrink-0">
                  <h2 className="text-2xl font-display text-forest">
                    Your Cart
                  </h2>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="p-2 bg-muted rounded-full"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <ProductCart onCloseSheet={() => setIsCartOpen(false)} />
              </DrawerContent>
            </Drawer>
          ) : (
            <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
              <SheetTrigger asChild>
                <CartButton />
              </SheetTrigger>
              <SheetContent className="w-[300px] sm:w-[540px] p-0">
                <SheetTitle className="sr-only">Shopping Cart</SheetTitle>
                <div className="flex items-center gap-3 p-4 py-8 bg-card border-b border-border">
                  <ShoppingBag className="h-5 w-5 text-foreground" />
                  <h2 className="text-lg font-semibold text-foreground">
                    Shopping Cart
                  </h2>
                </div>
                <ProductCart onCloseSheet={() => setIsCartOpen(false)} />
              </SheetContent>
            </Sheet>
          )}

          <Link
            href="/products"
            className="hidden sm:inline-flex px-5 py-2 rounded-full bg-forest hover:bg-forest/90 text-cream text-sm font-medium transition-colors"
          >
            Shop now
          </Link>

          <button
            className="lg:hidden p-2 rounded-md border border-border"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            <Menu className="w-5 h-5 text-foreground" />
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-background">
          <div className="px-6 py-4 flex flex-col gap-3">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-foreground/80 py-1 hover:text-forest font-medium"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
