/* eslint-disable @next/next/no-img-element */
import { OUR_TEAM } from "@/constants/about";
import { Members, TEAM } from "@/types/team";
import { BASE_API_URL } from "@/utils/config";
import { revalidatePath } from "next/cache";
import Image from "next/image";

const getTeams = async () => {
  try {
    const response = await fetch(BASE_API_URL + "/team-members", {
      next: { revalidate: 10 },
    });
    return response.json();
  } catch (error) {
    console.error("Error while fetching FAQs", error);
    return OUR_TEAM;
  }
};

const OurTeam = async () => {
  let data: Members = await getTeams();
  if (data.length == 0) {
    data = OUR_TEAM;
  }
  return (
    <section className="py-10 sm:py-16 lg:pt-5">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
            Meet the brains
          </h2>
          <p className="max-w-md mx-auto mt-4 text-base leading-relaxed text-gray-600">
            This is the team that makes everything possible and makes sure that
            everything runs smoothly.
          </p>
        </div>

        <div className="grid grid-cols-2 mt-8 text-center sm:mt-16 lg:mt-20 sm:grid-cols-4 gap-y-8 lg:grid-cols-4 gap-x-4">
          {data.map((member) => (
            <div
              key={member.id}
              className="flex flex-col items-center p-4 border rounded-lg shadow-lg transition-transform transform hover:scale-105"
            >
              <img
                className="object-cover mx-auto rounded-lg w-80 h-96 overflow-hidden"
                src={member.photo}
                alt={member.name}
              />
              <p className="mt-4 text-lg font-semibold leading-tight text-black">
                {member.name}
              </p>
              <p className="mt-1 text-base leading-tight text-gray-600">
                {member.role}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurTeam;
