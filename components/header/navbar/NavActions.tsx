import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { MenuIcon, SearchIcon, ShoppingCartIcon, UserIcon } from "lucide-react";
import NavMenusMobile from "./NavMenusMobile";

const NavActions = () => {
  return (
    <div className=" flex gap-2 items-center   justify-end">
      <Button className="lg:inline-flex hidden">
        Search
        <SearchIcon className="h-4 w-4 ml-2 " />
      </Button>
      <Button className="lg:hidden inline-flex" size={"icon"} variant={"ghost"}>
        <SearchIcon />
      </Button>
      <Button variant={"ghost"} size={"icon"}>
        <UserIcon />
      </Button>
      <Button variant={"ghost"} size={"icon"}>
        <ShoppingCartIcon />
      </Button>
      <div className=" md:hidden flex justify-center items-center">
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
