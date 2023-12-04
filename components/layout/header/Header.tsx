import Navbar from "./navbar/Navbar";

const Header = () => {
  return (
    <div className=" pb-[96px]">
      <div className="shadow w-full bg-white fixed z-10  ">
        <Navbar />
      </div>
    </div>
  );
};
export default Header;
