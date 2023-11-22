import { HelpCircleIcon, MessagesSquareIcon, TruckIcon } from "lucide-react";
import Link from "next/link";

const HERO_QUICK_LINKS = [
  {
    title: "Track Order",
    Icon: TruckIcon,
    href: "/",
  },
  {
    title: "Chat With Us",
    Icon: MessagesSquareIcon,
    href: "/",
  },
  {
    title: "FAQs",
    Icon: HelpCircleIcon,
    href: "/",
  },
];

const HeroQuickLinks = () => {
  return (
    <div className="container ">
      <div className="flex justify-between gap-4 mx-auto ">
        {HERO_QUICK_LINKS.map(({ href, Icon, title }, index) => (
          <Link
            href={href}
            className=" flex  sm:flex-row flex-col gap-2 items-center  hover:text-amber-700 transition-all"
            key={index}
          >
            <Icon className="sm:h-10 sm:w-10 h-6 w-6 text-amber-700" />{" "}
            <span className="sm:text-lg text-base text-center  font-semibold">
              {title}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default HeroQuickLinks;
