import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { MenuIcon, PhoneCallIcon } from "lucide-react";
import Link from "next/link";
import NavMenusMobile from "./NavMenusMobile";
import CartButton from "./CartButton";
import { yachuPhone } from "@/constants/constant";

const NavActions = () => {
  return (
    <div className="flex items-center justify-between w-full lg:w-auto gap-3">
      {/* Cart Button */}
      <CartButton className="scale-110" />

      {/* Phone Section (Smaller on mobile) */}
      <div className="hidden lg:flex flex-col items-center text-sm">
        <Link href={`tel:${yachuPhone}`}>
          <Button className="gap-1 px-2 py-1 text-xs text-primary-foreground bg-secondary hover:bg-secondary/80">
            <PhoneCallIcon size={13} /> {yachuPhone}
          </Button>
        </Link>
        <div className="text-sm text-primary">Speak with Yachu</div>
      </div>

      {/* Mobile Menu Icon */}
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger>
            <MenuIcon size={25} className="pt-2 text-black"/>
          </SheetTrigger>
          <SheetContent className="w-[240px] sm:w-[360px]">
            <NavMenusMobile />
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default NavActions;
