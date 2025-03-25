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
  const { our_story, about_founder, message_from_ceo } =
    aboutdetails.length > 0 ? aboutdetails[0] : DUMMY_SITE_CONFIG[0];

  return (
    <div className="bg-gradient-to-b from-white to-amber-50">
      {/* Our Story Section */}
      <section className="relative overflow-hidden">
        <div className="container px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-12 xl:gap-x-24 items-center py-24 lg:py-32">
            <div className="lg:order-2 relative">
              <div className="relative ">
                <Image
                  className="w-full h-auto rounded-2xl shadow-xl transform hover:scale-105 transition-transform duration-300"
                  src="/1024.png"
                  alt="yachu hair oil product image"
                  width={600}
                  height={600}
                  priority
                />
              </div>
              <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-amber-100 rounded-full opacity-20 blur-3xl"></div>
            </div>

            <div className="lg:order-1 relative">
              <div className="space-y-8">
                <div>
                  <p className="inline-block px-4 py-2 rounded-full bg-amber-100 text-amber-800 text-sm font-medium tracking-wider uppercase">
                    Wanna know us better?
                  </p>
                  <h2 className="mt-6 text-4xl font-bold text-gray-900 sm:text-5xl lg:text-6xl">
                    Our Story
                  </h2>
                </div>
                <div className="prose prose-lg text-gray-600 max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: our_story }}></div>
                </div>
                <a
                  href="#"
                  className="inline-flex items-center px-8 py-4 text-base font-semibold text-white transition-all duration-200 bg-amber-700 rounded-lg hover:bg-amber-800 focus:ring-2 focus:ring-amber-700 focus:ring-offset-2"
                  role="button"
                >
                  Contact us
                  <svg
                    className="w-5 h-5 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Founder & Message Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="container px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid items-center grid-cols-1 lg:grid-cols-2 gap-x-12 xl:gap-x-24 gap-y-16">
            <div className="relative order-2 lg:order-1">
              <div className="relative p-8 bg-white rounded-2xl shadow-xl lg:p-12">
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                    About Founder
                  </h2>
                  <div className="prose prose-lg text-gray-600">
                    <div
                      dangerouslySetInnerHTML={{ __html: about_founder }}
                    ></div>
                  </div>
                </div>
              </div>
              <div className="absolute -left-16 -bottom-16 w-64 h-64 bg-amber-100 rounded-full opacity-20 blur-3xl"></div>
            </div>

            <div className="relative order-1 lg:order-2">
              <div className="relative">
                <div className="absolute inset-0 bg-[url('https://cdn.rareblocks.xyz/collection/celebration/images/content/3/dots-pattern.svg')] bg-repeat-space opacity-10"></div>
                <div className="relative bg-amber-700 rounded-2xl p-8 lg:p-12">
                  <div className="flex items-start space-x-4">
                    <span className="text-4xl">👋</span>
                    <blockquote className="flex-1">
                      <div
                        className="text-lg font-medium text-white leading-relaxed"
                        dangerouslySetInnerHTML={{
                          __html: message_from_ceo,
                        }}
                      />
                    </blockquote>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
