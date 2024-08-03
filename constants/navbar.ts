import { Routes } from "@/utils/routes";

type NavbarLinkProps = {
  title: string;
  options?: {
    title: "Hair Care";
    href: "";
    description: "A modal dialog that interrupts the user with important content and expects a response.";
  }[];
  href: string;
};

export const NAVBAR_LINKS: NavbarLinkProps[] = [
  {
    title: "Home",
    href: Routes.home.root,
  },
  {
    title: "Our Products",
    href: "/#products",
  },
  {
    title: "Blog",
    href: "/blog",
  },
  {
    title: "Gallery",
    href: "/gallery",
  },
  {
    title: "Contact",
    href: "/contact",
  },
  {
    title: "Privacy Policy",
    href: "/privacy-policy",
  },
];
