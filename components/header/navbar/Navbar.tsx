import Image from "next/image";
import { NavMenus } from "./NavMenus";
const Navbar = () => {
  return (
    <div className="grid grid-cols-3 items-center  p-4">
      <div className="">
        <Image
          src="/logo.jpg"
          alt="me"
          width="500"
          height="500"
          className="w-16"
        />
      </div>
      <div className="">
        <NavMenus />
      </div>
    </div>
  );
};
export default Navbar;
