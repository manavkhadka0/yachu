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
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const SOCIAL_LINKS = [
  { Icon: FacebookIcon, href: yachuFacebook },
  { Icon: InstagramIcon, href: yachuInstagram },
  { Icon: YoutubeIcon, href: yachuYoutube },
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
    <footer className="w-full border-t bg-primary">
      <div className="container mx-auto grid gap-10 py-12 px-5 lg:grid-cols-4 sm:grid-cols-2 grid-cols-1">
        {/* Company Info & Socials */}
        <div className="flex flex-col gap-4">
          <Image
            src={yachuLogoPath}
            alt="Yachu Hair Oil Logo"
            width={300}
            height={300}
            className="w-36"
          />
          <p className="text-sm text-primary-foreground">{yachuDescription}</p>
          <div className="flex items-center gap-4">
            {SOCIAL_LINKS.map(({ Icon, href }, index) => (
              <Button asChild key={index} size="icon" className="rounded-full bg-secondary hover:underline">
                <Link href={href} target="_blank" rel="noopener noreferrer">
                  <Icon className="text-primary-foreground" size={20} />
                </Link>
              </Button>
            ))}
          </div>
        </div>

        {/* Link Columns */}
        <FooterLinkColumn title="Types of Hair Oil" links={CATEGORIES_LINKS} />
        <FooterLinkColumn title="Support" links={SUPPORT_LINKS} />
        <FooterContactDetails />
      </div>

      {/* Copyright */}
      <Separator />
      <div className="container mx-auto py-6 text-center text-sm text-primary-foreground">
        © {new Date().getFullYear()} Yachu Hair Oil. All rights reserved.
      </div>
    </footer>
  );
};
export default Footer;
