import Link from "next/link";
import { Button } from "@/components/ui/button";
import { NAVBAR_LINKS } from "@/constants/navbar";

const NavMenusMobile = () => {
  return (
    <div className="flex flex-col gap-4 my-4">
      {NAVBAR_LINKS.map((link, index) => (
        <Link href={link.href} key={index}>
          <Button
            variant="ghost"
            className="w-full justify-start text-left"
          >
            {link.title}
          </Button>
        </Link>
      ))}
    </div>
  );
};

export default NavMenusMobile;
