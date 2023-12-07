import Image from "next/image";

const About = () => {
  return (
    <div className=" ">
      <div className="container py-12 ">
        <div className="grid sm:grid-cols-2 sm:grid-flow-col grid-flow-row rounded-lg overflow-hidden  ">
          <div className="bg-amber-50/80 flex flex-col justify-center items-center gap-4 p-8">
            <Image
              src="/logo.svg"
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
      </div>
    </div>
  );
};
export default About;
