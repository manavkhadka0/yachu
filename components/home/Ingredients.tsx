import { INGREDIENTS } from "@/constants/product";
import { Badge } from "../ui/badge";

const Ingredients = () => {
  return (
    <div className="pb-24 mt-5">
      <h3 className="sm:text-2xl font-bold  text-center uppercase mb-10">
        Yachu Hair Oil - Ingredients
      </h3>
      <div className="flex gap-2 sm:gap-4 flex-wrap container mb-12 justify-center items-center ">
        {INGREDIENTS.map((item) => (
          <Badge
            key={item}
            variant={"secondary"}
            className=" sm:text-sm bg-amber-50 text-amber-900 hover:bg-amber-900 hover:text-white"
          >
            {item}
          </Badge>
        ))}
      </div>{" "}
    </div>
  );
};
export default Ingredients;
