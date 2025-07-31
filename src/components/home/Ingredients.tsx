import { INGREDIENTS } from "@/constants/product";
import { Badge } from "../ui/badge";

const Ingredients = () => {
  return (
    <div className="pb-10 mt-5">
      <h3 className="sm:text-2xl font-bold   text-center uppercase mb-10">
        Yachu Hair Oil - Ingredient&apos;s
      </h3>
      <div className="flex gap-2 sm:gap-4 flex-wrap container mx-auto mb-12 justify-center items-center ">
        {INGREDIENTS.map((item) => (
          <Badge
            key={item}
            variant={"secondary"}
            className=" sm:text-sm bg-primary text-primary-foreground  rounded-3xl"
          >
            {item}
          </Badge>
        ))}
      </div>{" "}
    </div>
  );
};
export default Ingredients;
