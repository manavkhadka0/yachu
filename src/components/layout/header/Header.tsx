import Navbar from "./navbar/Navbar";

const Header = () => {
  return (
    <div className="pb-[96px]">
      <div className="fixed top-0 left-0 right-0 z-40 w-full border-b border-border bg-background/85 backdrop-blur-md">
        <Navbar />
      </div>
    </div>
  );
};

export default Header;
