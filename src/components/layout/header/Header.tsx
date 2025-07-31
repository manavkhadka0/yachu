import Navbar from "./navbar/Navbar";

const Header = () => {
  return (
    <div className="pb-[96px]">
      <div className="fixed top-0 left-0 right-0 z-40 bg-background ">
        <Navbar />
      </div>
    </div>
  );
};

export default Header;
