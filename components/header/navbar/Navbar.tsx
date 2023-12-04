import Image from "next/image";
import { NavMenus } from "./NavMenus";
import NavActions from "./NavActions";
import Link from "next/link";
const Navbar = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 items-center  p-4 container mx-auto  ">
      <div className="">
        <Link href={"/"}>
          <Image
            src="/logo.svg"
            alt="me"
            width="500"
            height="500"
            className="w-16"
          />
        </Link>
      </div>
      <div className=" hidden md:block ">
        <NavMenus />
      </div>
      <NavActions />
    </div>
  );
};
export default Navbar;
