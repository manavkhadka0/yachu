import { TSiteSetting } from "@/types/site-setting";
import { BASE_API_URL } from "@/utils/config";
import Image from "next/image";

type AboutProps = {
  aboutdetails: TSiteSetting;
};

const DUMMY_SITE_CONFIG: TSiteSetting = [
  {
    id: 1,
    meta_title: "Meta Title Landing Page",
    meta_description: "Meta Description Landing Page",
    hero_title: "Title",
    hero_section_subtitle:
      "Discover The Best Hiking Trails And Bee-Watching Spots On Your Next Adventure. Book A Trip Now",
    hero_section_image: "./yachu-hero.png",
    about_founder: "dummy_founder",
    message_from_ceo: "dummy_messgae",
    our_story: "dummy_story",
  },
];

const getAboutData = async () => {
  try {
    const res = await fetch(`${BASE_API_URL}/site-configs`, {
      next: { revalidate: 10 },
    });
    const data: TSiteSetting = await res.json();
    return data;
  } catch (error) {
    return DUMMY_SITE_CONFIG;
  }
};

const About: React.FC<AboutProps> = async () => {
  const aboutdetails = await getAboutData();
  // console.log("Details:::", aboutdetails);
  const { our_story, about_founder, message_from_ceo } = aboutdetails.length > 0 ? aboutdetails[0] : DUMMY_SITE_CONFIG[0];

  return (
    <div className=" pb-24 ">
      <section className=" bg-white ">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid items-stretch grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-12 xl:gap-x-24">
            <div className="hidden lg:block h-full pr-12 lg:order-2 lg:mb-40">
              <div className="relative h-full mt-12 lg:h-auto">
                <div className="absolute xl:h-screen md:w-auto w-full h-full -mb-12 overflow-hidden bg-gradient-to-r from-amber-400 to-amber-700 top-12 left-12 xl:left-16 lg:top-0 lg:scale-y-105 lg:origin-top">
                  <img
                    className="object-cover object-right w-full h-full scale-150"
                    src="https://cdn.rareblocks.xyz/collection/celebration/images/content/2/lines.svg"
                    alt=""
                  />
                </div>
                <div className="relative ">
                  <img
                    className="shadow-2xl h-screen "
                    src="/hair.webp"
                    alt=""
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center lg:order-1 ">
              <div>
                <p className="text-sm pt-4  font-semibold tracking-widest text-gray-500 uppercase">
                  Wanna know us better?
                </p>
                <h2 className="mt-4 text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl lg:leading-tight">
                  Our Story
                </h2>
                <p className="text-lg md:text-lg text-gray-600 font-medium leading-relaxed  mt-5">
                  <div dangerouslySetInnerHTML={{ __html: our_story }}></div>
                </p>
                <a
                  href="#"
                  title=""
                  className="inline-flex items-center justify-center px-10 py-4 mt-12 text-base font-semibold text-white transition-all duration-200 bg-amber-700 rounded-md hover:bg-amber-900 focus:bg-amber-900"
                  role="button"
                >
                  {" "}
                  Contact us{" "}
                </a>
              </div>
            </div>
          </div>
        </div>
        <section className=" bg-white ">
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="grid items-center grid-cols-1 lg:grid-cols-2 gap-x-12 xl:gap-x-24 gap-y-12">
              <div className=" hidden lg:block relative lg:mb-12">
                <img
                  className="absolute -right-0 object-cover -bottom-8 xl:-bottom-12 xl:-right-4"
                  src="https://cdn.rareblocks.xyz/collection/celebration/images/content/3/dots-pattern.svg"
                  alt=""
                />
                <div className="pl-4 pr-6 ">
                  <img
                    className="relative object-cover h-96"
                    src="/person.png"
                    alt=""
                  />
                </div>
                <div className="absolute left-0 pr-12 bottom-8 xl:bottom-20">
                  <div className="max-w-xs bg-amber-600 rounded-lg sm:max-w-md xl:max-w-md">
                    <div className="px-3 py-4 sm:py-6 sm:px-4 ">
                      <div className="flex items-start">
                        <p className="text-3xl sm:text-4xl">👋</p>
                        <blockquote className="">
                          <p className="text-sm font-medium text-white sm:text-lg" dangerouslySetInnerHTML={{ __html: message_from_ceo }}>
                          </p>
                        </blockquote>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="2xl:pl-16">
                <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl lg:leading-tight mt-4">
                  About Founder
                </h2>
                <p className="text-lg md:text-lg text-gray-600 font-medium leading-relaxed  mt-5">
                  <div
                    dangerouslySetInnerHTML={{ __html: about_founder }}
                  ></div>
                </p>
              </div>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
};
export default About;
