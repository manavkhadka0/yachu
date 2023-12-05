import Image from "next/image";

const About = () => {
  return (
    <div className=" ">
      <div className="container py-12">
        <h2 className=" text-3xl font-bold mb-6">About Us</h2>
        <div className="grid sm:grid-cols-2 sm:grid-flow-col grid-flow-row  ">
          <div className="sm:order-1">
            <Image
              src="/logo.svg"
              height={300}
              width={500}
              alt="logo"
              className=" w-full object-contain h-60"
            />
          </div>
          <div className=" text-gray-500 font-medium flex flex-col gap-2">
            <p>
              Whether you dream of thicker, stronger hair or want to smooth
              flyaways and control frizz, our ethically-sourced oils provide
              lightweight moisture without weighing your hair down. They absorb
              quickly to replenish hair from root to tip, leaving it touchably
              soft.
            </p>{" "}
            <p>
              We take pride in doing business responsibly and sustainably at
              every step. Our oils come in recyclable packaging and we partner
              with programs that plant trees and offset our carbon footprint.
            </p>
            <p>
              At Yachu, caring for hair and our planet go hand-in-hand. Discover
              for yourself why we have a rapidly-growing community raving about
              our oils. We can&apos;t wait for you to make our products a
              cherished part of your own hair care ritual.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default About;
