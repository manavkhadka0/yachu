import { FacebookIcon, InstagramIcon, YoutubeIcon } from "lucide-react";
import FooterContactDetails from "./footer-contact-detail";
import FooterLinkColumn from "./footer-link-column";
import Image from "next/image";
import Link from "next/link";
import {
  yachuFacebook,
  yachuInstagram,
  yachuYoutube,
  yachuLogoPath,
  yachuDescription,
} from "@/constants/constant";

const SOCIAL_LINKS = [
  { Icon: FacebookIcon, href: yachuFacebook, label: "Facebook" },
  { Icon: InstagramIcon, href: yachuInstagram, label: "Instagram" },
  { Icon: YoutubeIcon, href: yachuYoutube, label: "YouTube" },
];

const CATEGORIES_LINKS = [
  { name: "For Dandruff", href: "/#products" },
  { name: "For Hairfall", href: "/#products" },
  { name: "For Baldness", href: "/#products" },
];

const SUPPORT_LINKS = [
  { name: "Privacy Policy", href: "/contact" },
  { name: "Refund Policy", href: "/contact" },
  { name: "Shipping Policy", href: "/contact" },
  { name: "Terms of Service", href: "/" },
  { name: "Proposal", href: "/proposal" },
];

const Footer = () => {
  return (
    <footer className="relative w-full overflow-hidden bg-gradient-to-br from-forest to-[oklch(0.2_0.05_150)] text-cream">
      <div className="h-1 w-full bg-gradient-to-r from-transparent via-gold to-transparent" />

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr] lg:gap-12">
        {/* Company Info & Socials */}
        <div className="flex flex-col gap-5">
          <Image
            src={yachuLogoPath}
            alt="Yachu Hair Oil Logo"
            width={300}
            height={300}
            className="w-28"
          />
          <p className="max-w-sm text-sm leading-relaxed text-cream/70">
            {yachuDescription}
          </p>
          <div className="flex items-center gap-3">
            {SOCIAL_LINKS.map(({ Icon, href, label }) => (
              <Link
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/20 text-cream transition-colors hover:border-gold hover:bg-gold hover:text-forest"
              >
                <Icon size={18} />
              </Link>
            ))}
          </div>
        </div>

        {/* Link Columns */}
        <FooterLinkColumn title="Types of Hair Oil" links={CATEGORIES_LINKS} />
        <FooterLinkColumn title="Support" links={SUPPORT_LINKS} />
        <FooterContactDetails />
      </div>

      {/* Copyright */}
      <div className="border-t border-cream/10">
        <div className="mx-auto max-w-7xl px-6 py-6 text-sm text-cream/60 md:text-center">
          © {new Date().getFullYear()} Yachu Hair Oil. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
export default Footer;
