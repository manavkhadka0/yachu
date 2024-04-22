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

  // {
  //   title: "Shop",
  //   options: [
  //     {
  //       title: "Hair Care",
  //       href: "",
  //       description:
  //         "A modal dialog that interrupts the user with important content and expects a response.",
  //     },
  //     {
  //       title: "Pain Relief",
  //       href: "",
  //       description:
  //         "For sighted users to preview content available behind a link.",
  //     },
  //     {
  //       title: "Skin Care",
  //       href: "",
  //       description:
  //         "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  //     },
  //     {
  //       title: "Treatment",
  //       href: "/",
  //       description: "Visually or semantically separates content.",
  //     },
  //   ],
  //   href: "/",
  // },

  // {
  //   title: "About",
  //   href: "#about",
  // },
  {
    title: "Contact",
    href: "/contact",
  },
  {
    title: "Our Products",
    href: "/#products",
  },
  {
    title: "Blog",
    href: "/#blogsection",
  },
];
