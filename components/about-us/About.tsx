import { OUR_TEAM } from "@/constants/about";
import Image from "next/image";
import OurTeam from "./OurTeam";

const About = () => {
  return (
    <div className=" ">
      <div className="container py-12">
        <h2 className=" text-3xl font-bold mb-4 text-center">About Us</h2>
        <div className="grid mb-12  ">
          <div className="">
            <Image
              src="/logo.jpg"
              height={300}
              width={500}
              alt="logo"
              className=" w-full object-contain  h-52"
            />
          </div>
          <div className=" text-gray-500 font-medium text-center  text-sm sm:text-base">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            a volutpat est, id rhoncus mi. Aliquam congue ipsum et risus
            tincidunt aliquam. Nunc tempor aliquam diam, eu interdum neque
            malesuada non. Quisque ac vestibulum tellus, nec posuere nunc. Nunc
          </div>
        </div>
        <OurTeam />
      </div>
    </div>
  );
};
export default About;
