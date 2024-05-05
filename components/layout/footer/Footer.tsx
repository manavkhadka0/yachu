import {
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
  YoutubeIcon,
} from "lucide-react";
import FooterContactDetails from "./FooterContactDetails";
import FooterLinkColumn from "./FooterLinkColumn";
import Image from "next/image";
import Link from "next/link";

const SOCIAL_LINKS = [
  { Icon: FacebookIcon, href: "https://www.facebook.com/Yachu.in" },
  { Icon: InstagramIcon, href: "https://www.instagram.com/yachu.np/" },
  { Icon: YoutubeIcon, href: "https://www.youtube.com/@yachu_np" },
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
    <div className=" w-full bg-slate-800 text-white py-8">
      <div className=" container mx-auto grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-10 py-8 ">
        <div className="flex flex-col gap-4">
          <Image
            src="/yachu-logo.svg"
            alt="me"
            width="300"
            height="300"
            className="w-36"
          />
          <p className="text-slate-300 text-sm">
            Experience the beauty of naturally nourished hair with Yachu Hair
            Oil. Our premium botanical blends, crafted with care and tradition,
            are designed to elevate your hair care routine. Join our community
            of enthusiasts and indulge in the goodness of healthy, beautiful
            hair, sustainably and responsibly
          </p>
          <div className=" flex gap-4 items-center">
            {SOCIAL_LINKS.map(({ Icon, href }, index) => (
              <Link
                href={href}
                key={index}
                className=" border-slate-300 text-slate-300 border p-2 inline-block rounded-full hover:text-amber-600 hover:border-amber-600 transition-all"
              >
                <Icon size={20} />
              </Link>
            ))}
          </div>
        </div>
        <FooterLinkColumn title="Types of Hair Oil" links={CATEGORIES_LINKS} />
        <FooterLinkColumn title="Support" links={SUPPORT_LINKS} />
        <FooterContactDetails />
      </div>
    </div>
  );
};
export default Footer;
