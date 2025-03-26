import Image from "next/image";
import { NavMenus } from "./NavMenus";
import NavActions from "./NavActions";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="border-b z-10">
      <div className="container mx-auto">
        <div className="flex items-center py-2 justify-between px-4">
          <div className="flex-shrink-0">
            <Link href={"/"}>
              <Image
                src="/yachuoil.jpg"
                alt="Yachu Logo"
                width={64}
                height={64}
                className="w-16 h-auto object-contain"
              />
            </Link>
          </div>

          <div className="hidden lg:flex flex-1 justify-center">
            <NavMenus />
          </div>

          <div className="flex items-center">
            <NavActions />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
