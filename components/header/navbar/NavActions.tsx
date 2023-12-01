import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Routes } from "@/utils/routes";
import { MenuIcon, SearchIcon, ShoppingCartIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import NavMenusMobile from "./NavMenusMobile";

const NavActions = () => {
  return (
    <div className=" flex gap-2 items-center   justify-end">
      <Button variant={"ghost"} size={"icon"}>
        <UserIcon />
      </Button>
      <Button variant={"ghost"} size={"icon"}>
        <ShoppingCartIcon />
      </Button>
      <div className="flex gap-2 flex-col">
        <p className="text-sm text-gray-500">Want to know your hair type?</p>
        <Link href={Routes.survey.root} legacyBehavior passHref>
          <Button className="lg:inline-flex hidden">
            Give quick hair quiz
          </Button>
        </Link>
      </div>
      <div className=" md:hidden block">
        <Sheet>
          <SheetTrigger>
            <MenuIcon />
          </SheetTrigger>
          <SheetContent className="w-[200px] sm:w-[540px]">
            <NavMenusMobile />
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};
export default NavActions;
