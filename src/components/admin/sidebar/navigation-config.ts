import {
  ShoppingCart,
  FileText,
  ContactIcon,
  Users,
  Zap
} from "lucide-react";

export const navItems = [
  {
    title: "Orders",
    url: "/admin/orders",
    icon: ShoppingCart,
    isActive: (pathname: string) => pathname.startsWith("/admin/orders"),
  },
  {
    title: "Instant Orders",
    url: "/admin/instant-orders",
    icon: Zap,
    isActive: (pathname: string) => pathname.startsWith("/admin/instant-orders"),
  },
  {
    title: "Blogs",
    url: "/admin/blogs",
    icon: FileText,
    isActive: (pathname: string) => pathname.startsWith("/admin/blogs"),
  },

  {
    title: "Contact",
    url: "/admin/contact",
    icon: ContactIcon,
    isActive: (pathname: string) => pathname.startsWith("/admin/contact"),
  },
    {
    title: "Team Members",
    url: "/admin/team",
    icon: Users,
    isActive: (pathname: string) => pathname.startsWith("/admin/team"),
  },
];
