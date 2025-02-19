import { Button } from "@/components/ui/button";
import { NAVBAR_LINKS } from "@/constants/navbar";
import Link from "next/link";

const NavMenusMobile = () => {
  return (
    <div className="flex flex-col gap-4 my-4  ">
      {NAVBAR_LINKS.map(({ title, href }, index) => (
        <Link href={href} key={index}>
          <Button variant={"ghost"} className="w-full justify-start">
            {title}
          </Button>
        </Link>
      ))}
    </div>
  );
};
export default NavMenusMobile;
