import { LeafIcon } from "lucide-react";

const Questions = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-[#FEF9E3]">
      <div className="px-6 pb-5 mx-auto sm:px-8 lg:px-12 max-w-7xl">
        <div className="grid grid-cols-1 gap-y-12 xl:grid-cols-6 gap-x-8">
          <div className="xl:col-span-2">
            <h2 className="tracking-tighter text-black">
              <span className="font-serif text-3xl font-medium sm:text-5xl md:text-6xl">
                {" "}
                Is Yachu{" "}
              </span>
              <span className="font-serif text-3xl font-medium sm:text-6xl sm:block md:text-7xl ">
                {" "}
                for me?{" "}
              </span>
            </h2>
          </div>

          <div className="xl:col-span-4">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              <div className="transition-all duration-200 bg-white shadow-2xl shadow-md rounded-lg border-neutral hover:bg-dark-gray">
                <div className="px-4 py-5 sm:px-6 sm:py-8">
                  <div className=" p-4 bg-lime-600 text-white flex pl-6 rounded-full items-center w-fit md:w-full">
                    <LeafIcon size={30} />

                    <h3 className=" font-serif text-xl italic font-semibold pl-3 text-gray-100 md:text-2xl">
                      Why?
                    </h3>
                  </div>
                  <p className="mt-4 font-sans text-base font-normal text-opacity-100 text-black">
                    We understand that hair is more than just strands –
                    it&apos;s a reflection of one&apos;s identity and
                    confidence.
                  </p>
                </div>
              </div>
              <div className="transition-all duration-200 shadow-md rounded-lg border-neutral hover:bg-dark-gray bg-white shadow-2xl">
                <div className="px-4 py-5 sm:px-6 sm:py-8">
                  <div className=" p-4 bg-amber-700 text-white flex pl-6 rounded-full items-center w-fit md:w-full">
                    <LeafIcon size={30} />

                    <h3 className=" font-serif text-xl italic font-semibold pl-3 text-gray-100 md:text-2xl">
                      How?
                    </h3>
                  </div>
                  <p className="mt-4 font-sans text-base font-normal text-opacity-100 text-black">
                    Yachu Hair Oil: Blending traditional techniques with modern
                    precision, featuring coconut, olive, almond, and castor oils
                    for nourishment.
                  </p>
                </div>
              </div>

              <div className="transition-all duration-200 bg-white shadow-2xl shadow-md rounded-lg border-neutral hover:bg-dark-gray">
                <div className="px-4 py-5 sm:px-6 sm:py-8">
                  <div className=" p-4 bg-yellow-600 text-white pl-6 flex rounded-full items-center w-fit md:w-full ">
                    <LeafIcon size={30} />

                    <h3 className=" font-serif text-xl italic font-semibold pl-3 text-gray-100 md:text-2xl">
                      What?
                    </h3>
                  </div>
                  <p className="mt-4 font-sans text-base font-normal text-opacity-100 text-black">
                    Yachu Hair Oil is not just a product; it&apos;s a promise to
                    care for your hair and the planet simultaneously.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Questions;
