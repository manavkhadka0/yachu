import Image from "next/image";

const About = () => {
  return (
    <div className=" ">
      <div className="container py-12">
        <h2 className=" text-3xl font-bold mb-6">About Us</h2>
        <div className="grid sm:grid-cols-2 sm:grid-flow-col grid-flow-row  ">
          <div className="sm:order-1">
            <Image
              src="/logo.jpg"
              height={300}
              width={500}
              alt="logo"
              className=" w-full object-contain h-60"
            />
          </div>
          <div className=" text-gray-500 font-medium">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            a volutpat est, id rhoncus mi. Aliquam congue ipsum et risus
            tincidunt aliquam. Nunc tempor aliquam diam, eu interdum neque
            malesuada non. Quisque ac vestibulum tellus, nec posuere nunc. Nunc
            sed sem eu urna dictum mollis. Maecenas neque tellus, fringilla quis
            nunc vitae, vulputate ullamcorper neque. Nullam eget vehicula
            ligula, ac porttitor augue. Aliquam felis odio, convallis quis felis
            eu, ultrices pellentesque sem. Sed dignissim finibus diam a
            faucibus.
            <br />
            <br />
            nunc vitae, vulputate ullamcorper neque. Nullam eget vehicula
            ligula, ac porttitor augue. Aliquam felis odio, convallis quis felis
            eu, ultrices pellentesque sem. Sed dignissim finibus diam a
            faucibus.
          </div>
        </div>
      </div>
    </div>
  );
};
export default About;
