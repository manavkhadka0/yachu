import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { MenuIcon, PhoneCallIcon, ShoppingCartIcon } from "lucide-react";
import Link from "next/link";
import NavMenusMobile from "./NavMenusMobile";
import CartButton from "./CartButton";

const NavActions = () => {
  return (
    <div className="flex items-center justify-between w-full lg:w-auto gap-3">
      {/* Cart Button */}
      <CartButton className="scale-90" />

      {/* Phone Section (Smaller on mobile) */}
      <div className="hidden lg:flex flex-col items-center text-sm">
        <Link href={"tel:+9779840412788"}>
          <Button className="gap-1 px-2 py-1 text-xs" variant="secondary">
            <PhoneCallIcon size={13} /> +977 984-0412788
          </Button>
        </Link>
        <div className="text-[10px]">Speak with Yachu</div>
      </div>

      {/* Mobile Menu Icon */}
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger>
            <MenuIcon size={20} />
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
