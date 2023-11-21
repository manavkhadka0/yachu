import { Button } from "@/components/ui/button";
import { SearchIcon, ShoppingCartIcon, UserIcon } from "lucide-react";

const NavActions = () => {
  return (
    <div className=" flex gap-2 items-center   justify-end">
      <Button>
        Search
        <SearchIcon className="h-4 w-4 ml-2" />
      </Button>
      <Button variant={"ghost"} size={"icon"}>
        <UserIcon />
      </Button>
      <Button variant={"ghost"} size={"icon"}>
        <ShoppingCartIcon />
      </Button>
    </div>
  );
};
export default NavActions;
