import { OUR_TEAM } from "@/constants/about";
import Image from "next/image";

const OurTeam = () => {
  return (
    <div className=" container mb-12">
      <h2 className=" text-3xl font-bold mb-6">Our Team</h2>
      <div className=" flex flex-col  items-center sm:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-5 gap-4  sm:gap-8 ">
        {OUR_TEAM.map((member) => (
          <div className=" max-w-xs mx:auto " key={member.name}>
            <Image
              src={member.imageSrc}
              alt={member.position}
              height={700}
              width={700}
              className=" rounded-xl md:h-80 h-96  object-cover  shadow-lg"
            />
            <div className=" flex flex-col gap-1 mt-4">
              <p className=" sm:text-lg font-medium">{member.name}</p>
              <p className=" text-sm  sm:text-base font-medium text-gray-400">
                {member.position}
              </p>
            </div>
          </div>
        ))}
      </div>{" "}
    </div>
  );
};
export default OurTeam;
