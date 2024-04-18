import Image from "next/image";

const About = () => {
  return (
    <div className=" ">
      {/* <div className="container py-12 ">
        <div className="grid sm:grid-cols-2 sm:grid-flow-col grid-flow-row rounded-lg overflow-hidden  ">
          <div className="bg-amber-50/80 flex flex-col justify-center items-center gap-4 p-8">
            <Image
              src="/logo.png"
              height={300}
              width={500}
              alt="logo"
              className=" w-full object-contain max-w-[150px]"
            />
            <h1 className="text-2xl uppercase font-bold my-4">Our Story</h1>
            <p className="text-center ">
              We take pride in doing business responsibly and sustainably at
              every step. Our oils come in recyclable packaging and we partner
              with programs that plant trees and offset our carbon footprint.At
              Yachu, caring for hair and our planet go hand-in-hand. Discover
              for yourself why we have a rapidly-growing community raving about
              our oils. We can&apos;t wait for you to make our products a
              cherished part of your own hair care ritual.
            </p>
          </div>
          <div className="bg-amber-100/50  flex flex-col justify-center items-center gap-4 p-8  ">
            <h1 className="text-2xl uppercase font-bold  my-4 text-center">
              About Founder
            </h1>
            <Image
              src="/person.png"
              height={300}
              width={500}
              alt="logo"
              className=" w-full object-contain max-w-[150px]"
            />
            <p className="text-center">
              Whether you dream of thicker, stronger hair or want to smooth
              flyaways and control frizz, our ethically-sourced oils provide
              lightweight moisture without weighing your hair down. They absorb
              quickly to replenish hair from root to tip, leaving it touchably
              soft. We take pride in doing business responsibly and sustainably
              at every step. Our oils come in recyclable packaging and we
              partner with programs that plant trees and offset our carbon
              footprint.
            </p>
          </div>
        </div>
      </div> */}
      <section className="py-10 bg-white lg:py-0">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid items-stretch grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-12 xl:gap-x-24">
            <div className="h-full pr-12 lg:order-2 lg:mb-40">
              <div className="relative h-full mt-12 lg:h-auto">
                <div className="absolute w-full h-full -mb-12 overflow-hidden bg-gradient-to-r from-amber-400 to-amber-700 top-12 left-12 xl:left-16 lg:top-0 lg:scale-y-105 lg:origin-top">
                  <img className="object-cover size-24 object-right w-full h-full scale-150" src="https://cdn.rareblocks.xyz/collection/celebration/images/content/2/lines.svg" alt="" />
                </div>
                <div className="relative lg:-top-12">
                  <img className="" src="https://cdn.rareblocks.xyz/collection/celebration/images/content/2/girl-drinking-coffee.jpg" alt="" />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-start py-10 lg:order-1 sm:py-16 lg:py-24 xl:py-48">
              <div>
                <p className="text-sm font-semibold tracking-widest text-gray-500 uppercase">Wanna know us better?</p>
                <h2 className="mt-8 text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl lg:leading-tight">Our Story</h2>
                <p className="text-xl leading-relaxed text-gray-700 mt-9">We take pride in doing business responsibly and sustainably at every step. Our oils come in recyclable packaging and we partner with programs that plant trees and offset our carbon footprint.</p>
                <p className="mt-6 text-xl leading-relaxed text-gray-700">At Yachu, caring for hair and our planet go hand-in-hand. Discover for yourself why we have a rapidly-growing community raving about our oils. We can't wait for you to make our products a cherished part of your own hair care ritual.</p>
                <a href="#" title="" className="inline-flex items-center justify-center px-10 py-4 mt-12 text-base font-semibold text-white transition-all duration-200 bg-amber-700 rounded-md hover:bg-amber-900 focus:bg-amber-900" role="button"> Contact us </a>
              </div>
            </div>
          </div>
        </div>
        <section className="py-10 bg-white sm:py-16 lg:py-24">
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="grid items-center grid-cols-1 lg:grid-cols-2 gap-x-12 xl:gap-x-24 gap-y-12">
              <div className="relative lg:mb-12">
                <img className="absolute -right-0 object-cover -bottom-8 xl:-bottom-12 xl:-right-4" src="https://cdn.rareblocks.xyz/collection/celebration/images/content/3/dots-pattern.svg" alt="" />
                <div className="pl-12 pr-6 ">
                  <img className="relative object-cover" src="/person.png" alt="" />
                </div>
                <div className="absolute left-0 pr-12 bottom-8 xl:bottom-20">
                  <div className="max-w-xs bg-amber-600 rounded-lg sm:max-w-md xl:max-w-md">
                    <div className="px-3 py-4 sm:px-5 sm:py-8">
                      <div className="flex items-start">
                        <p className="text-3xl sm:text-4xl">👋</p>
                        <blockquote className="ml-5">
                          <p className="text-sm font-medium text-white sm:text-lg">“You made it so simple. My new site is so much faster and easier to work with than my old site.”</p>
                        </blockquote>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="2xl:pl-16">
                <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl lg:leading-tight">About Founder</h2>
                <p className="text-xl leading-relaxed text-gray-900 mt-9">Whether you dream of thicker, stronger hair or want to smooth flyaways and control frizz, our ethically-sourced oils provide lightweight moisture without weighing your hair down. They absorb quickly to replenish hair from root to tip, leaving it touchably soft. </p>
                <p className="mt-6 text-xl leading-relaxed text-gray-900">We take pride in doing business responsibly and sustainably at every step. Our oils come in recyclable packaging and we partner with programs that plant trees and offset our carbon footprint.</p>
              </div>
            </div>
          </div>
        </section>

      </section>


    </div>
  );
};
export default About;
