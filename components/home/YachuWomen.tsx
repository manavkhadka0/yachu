import Image from "next/image";

const YachuWomen = () => {
  return (
    <div className="container relative my-12">
      <Image
        src={"/yachu-women.jpeg"}
        height={1000}
        width={1000}
        alt="yachu women"
        className="w-full  h-[350px] sm:h-[550px] object-cover brightness-75"
      />
      <div className="absolute bottom-[20%] sm:left-[100px] left-[40px] text-white">
        <h1 className="md:text-6xl text-3xl font-bold mb-2">Women of Yachu</h1>
        <p className="text-xl">We support women in business</p>
      </div>
    </div>
  );
};
export default YachuWomen;
