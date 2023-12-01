import FooterContactDetails from "./FooterContactDetails";
import FooterLinkColumn from "./FooterLinkColumn";

const USEFUL_LINKS = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Blog", href: "/" },
];

const CATEGORIES_LINKS = [
  { name: "Hair Care", href: "/" },
  { name: "Face Care", href: "/" },
  { name: "Pain Relief", href: "/" },
  { name: "Men's Care", href: "/" },
  { name: "New Launch", href: "/" },
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
    <div className=" w-full">
      <div className=" container mx-auto grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-10 py-8 border-t">
        <FooterLinkColumn title="Useful Links" links={USEFUL_LINKS} />
        <FooterLinkColumn title="Categories" links={CATEGORIES_LINKS} />
        <FooterLinkColumn title="Support" links={SUPPORT_LINKS} />
        <FooterContactDetails />
      </div>
    </div>
  );
};
export default Footer;
