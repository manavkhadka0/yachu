import Image from "next/image";
import { NavMenus } from "./NavMenus";
import NavActions from "./NavActions";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav>
      <div className="container mx-auto w-full px-6 lg:px-12 xl:px-24">
        <div className="flex items-center py-2 justify-between">
          <div className="flex-shrink-0">
            <Link href={"/"}>
              <Image
                src="/yachuoil.webp"
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
