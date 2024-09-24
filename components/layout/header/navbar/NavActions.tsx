import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { MenuIcon, PhoneCallIcon, ShoppingCartIcon } from "lucide-react";
import Link from "next/link";
import NavMenusMobile from "./NavMenusMobile";
import { Badge } from "@/components/ui/badge";
import CartButton from "./CartButton";

const NavActions = () => {
  return (
    <div className=" flex gap-2 items-center   justify-end">
      {/* <Button variant={"ghost"} size={"icon"} className="lg:block hidden">
        <UserIcon />
      </Button> */}
      <CartButton />
      <div className=" hidden lg:flex gap-2 flex-col items-center">
        <Link href={"tel:++977 984-0412788"}>
          <Button className="  inline-flex gap-2 " variant={"secondary"}>
            <PhoneCallIcon size={15} /> +977 984-0412788{" "}
          </Button>
        </Link>
        <p className="text-xs">Questions? Speak with Yachu</p>
      </div>
      <div className=" lg:hidden block">
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
