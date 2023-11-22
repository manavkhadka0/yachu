import DividerFlower from "../../public/divider-flower.svg";
import Image from "next/image";
const FlowerDivider = () => {
  return (
    <div className="flex w-full items-center container gap-2 my-12">
      <div className="h-[1px] bg-gray-300 flex-1 min-w-[40px]"> </div>
      <Image
        src={DividerFlower}
        width={400}
        height={60}
        alt={"divider"}
        className=" max-w-xs  w-32 sm:w-full"
      />
      <div className="h-[1px] bg-gray-300 flex-1 min-w-[40px]"></div>
    </div>
  );
};
export default FlowerDivider;
