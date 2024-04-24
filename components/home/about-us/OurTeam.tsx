import { OUR_TEAM } from "@/constants/about";
import { Members, TEAM } from "@/types/team";
import { BASE_URL } from "@/utils/config";
import { revalidatePath } from "next/cache";
import Image from "next/image";

const getTeams = async () => {
  try {
    const response = await fetch(BASE_URL + "/team-members", {
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
    <section className="py-8 bg-white sm:py-16 lg:py-12 xl:py-12">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="overflow-hidden bg-[#FEF9E3] rounded-3xl">
          <div className="grid grid-cols-2 lg:grid-cols-4">
            <div className="col-span-2 px-8 py-12 text-center xl:px-12 xl:pr-24 lg:text-left lg:order-1">
              <h2 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
                Meet the brain
              </h2>
              <p className="mt-4 text-base font-normal leading-7 text-gray-600 lg:text-lg lg:mt-6 lg:leading-8">
                Clarity gives you the blocks & components you need to create a
                truly professional website, landing page or admin panel for your
                SaaS.
              </p>
            </div>

            {data.map((member) => (
              <>
                <div
                  key={member.name}
                  className={`relative overflow-hidden lg:order-${member.order} group`}
                >
                  <img
                    className="object-cover w-full h-full transition-all duration-200 group-hover:scale-110"
                    src={member.photo}
                    alt=""
                  />

                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-80"></div>
                  <div className="absolute bottom-0 left-0 w-full p-3 sm:py-5 sm:px-6">
                    <div className="scale-90 sm:scale-100">
                      <p className="text-base font-semibold text-white">
                        {member.name}
                      </p>
                      <p className="mt-1 text-sm font-normal text-gray-300">
                        {member.role}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            ))}

            <div className="flex items-end justify-start px-8 py-8 xl:px-12 lg:order-4">
              <a
                href="#"
                title=""
                className="inline-flex items-center text-sm font-semibold text-gray-900 transition-all duration-200 group hover:text-gray-700 hover:underline"
              >
                See All Members
                <svg
                  className="w-5 h-5 ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2.5"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default OurTeam;
