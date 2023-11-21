import Image from "next/image";
import { NavMenus } from "./NavMenus";
import NavActions from "./NavActions";
const Navbar = () => {
  return (
    <div className="grid grid-cols-3 items-center  p-4 container mx-auto">
      <div className="">
        <Image
          src="/logo.jpg"
          alt="me"
          width="500"
          height="500"
          className="w-16"
        />
      </div>
      <NavMenus />
      <NavActions />
    </div>
  );
};
export default Navbar;
