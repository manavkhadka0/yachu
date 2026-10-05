import {
  ShoppingCart,
  FileText,
  ContactIcon,
  Users,
  Zap,
  Video,
  MessageSquareQuote
} from "lucide-react";

export const navItems = [
  {
    title: "Orders",
    url: "/admin/orders",
    icon: ShoppingCart,
    isActive: (pathname) => pathname.startsWith("/admin/orders"),
  },
  {
    title: "Instant Orders",
    url: "/admin/instant-orders",
    icon: Zap,
    isActive: (pathname) => pathname.startsWith("/admin/instant-orders"),
  },
  {
    title: "Blogs",
    url: "/admin/blogs",
    icon: FileText,
    isActive: (pathname) => pathname.startsWith("/admin/blogs"),
  },
  {
    title: "Contact",
    url: "/admin/contact",
    icon: ContactIcon,
    isActive: (pathname) => pathname.startsWith("/admin/contact"),
  },
  {
    title: "Team Members",
    url: "/admin/team",
    icon: Users,
    isActive: (pathname) => pathname.startsWith("/admin/team"),
  },
  {
    title: "Videos",
    url: "/admin/videos",
    icon: Video,
    isActive: (pathname) => pathname.startsWith("/admin/videos"),
  },
  {
    title: "Testimonials",
    url: "/admin/testimonials",
    icon: MessageSquareQuote,
    isActive: (pathname) => pathname.startsWith("/admin/testimonials"),
  },
];
