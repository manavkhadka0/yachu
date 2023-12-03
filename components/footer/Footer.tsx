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
  { Icon: FacebookIcon, href: "/" },
  { Icon: InstagramIcon, href: "/" },
  { Icon: YoutubeIcon, href: "/" },
  { Icon: TwitterIcon, href: "/" },
];

const CATEGORIES_LINKS = [
  { name: "For Dandruff", href: "/" },
  { name: "For Hairfall", href: "/" },
  { name: "For Baldness", href: "/" },
];

const SUPPORT_LINKS = [
  { name: "Privacy Policy", href: "/" },
  { name: "Refund Policy", href: "/" },
  { name: "Shipping Policy", href: "/" },
  { name: "Terms of Service", href: "/" },
  { name: "Franchise Proposal", href: "/franchise-proposal" },
];

const Footer = () => {
  return (
    <div className=" w-full bg-slate-800 text-white">
      <div className=" container mx-auto grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-10 py-8 border-t">
        <div className="flex flex-col gap-4">
          <Image
            src="/logo.jpg"
            alt="me"
            width="500"
            height="500"
            className="w-28"
          />
          <p className="text-slate-300 text-sm">
            nunc vitae, vulputate ullamcorper neque. Nullam eget vehicula
            ligula, ac porttitor augue. Aliquam felis odio, convallis quis felis
            eu, ultrices pellentesque sem. Sed dignissim finibus diam a
            faucibus.
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
