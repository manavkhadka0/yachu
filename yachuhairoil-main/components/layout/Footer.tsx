import { Leaf, Mail } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="relative pt-20 pb-10 border-t border-border bg-forest text-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Link href="/" className="flex items-center gap-2">
                <img
                  src="/yachuoillogo.webp"
                  alt="Logo"
                  className="h-20 w-auto object-contain"
                />
              </Link>
              <span className="font-display text-2xl">Yachu</span>
            </div>
            <p className="text-cream/75 max-w-md leading-relaxed">
              A slow-crafted herbal hair oil from Nepal. Made with 33 wild
              ingredients, the way it was always meant to be made.
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-4 text-sm uppercase tracking-widest text-gold">
              Shop
            </h4>
            <ul className="space-y-2 text-cream/75 text-sm">
              <li>
                <Link href="/products" className="hover:text-gold">
                  Our Collection
                </Link>
              </li>
              <li>
                <Link href="/how-to-use" className="hover:text-gold">
                  How to Use
                </Link>
              </li>
              <li>
                <Link href="/ingredientsm" className="hover:text-gold">
                  Ingredients
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-gold">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-4 text-sm uppercase tracking-widest text-gold">
              Brand
            </h4>
            <ul className="space-y-2 text-cream/75 text-sm">
              <li>
                <Link href="/about" className="hover:text-gold">
                  Our story
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-gold">
                  Journal
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gold">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gold">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-cream/15 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-cream/60">
          <p>
            © {new Date().getFullYear()} Yachu Hair Care · Made in Nepal with
            patience.
          </p>
        </div>
      </div>
    </footer>
  );
}
