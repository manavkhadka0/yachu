import { LeafIcon } from "lucide-react";

const Questions = () => {
  return (
    <div className="container flex flex-col gap-8 mb-20 mt-6">
      <div className="flex gap-4 items-center sm:flex-row flex-col">
        <div className=" p-4 bg-lime-600 text-white rounded-full">
          <LeafIcon size={40} />
        </div>
        <div className=" sm:text-left text-center">
          <h3 className="text-2xl font-bold mb-2">Why</h3>
          <p className="sm:text-md text-sm text-slate-500 font-medium">
            nunc vitae, vulputate ullamcorper neque. Nullam eget vehicula
            ligula, ac porttitor augue. Aliquam felis odio, convallis quis felis
            eu, ultrices pellentesque sem. Sed dignissim finibus diam a
            faucibus. eu, ultrices pellentesque sem. Sed dignissim finibus diam
            a faucibus. faucibus.
          </p>
        </div>
      </div>
      <div className="flex gap-4 items-center sm:flex-row flex-col">
        <div className=" p-4 bg-amber-700 text-white rounded-full">
          <LeafIcon size={40} />
        </div>
        <div className="sm:text-left text-center">
          <h3 className="text-2xl font-bold mb-2">How</h3>
          <p className="sm:text-md text-sm text-slate-500 font-medium">
            nunc vitae, vulputate ullamcorper neque. Nullam eget vehicula
            ligula, ac porttitor augue. Aliquam felis odio, convallis quis felis
            eu, ultrices pellentesque sem. Sed dignissim finibus diam a
            faucibus. eu, ultrices pellentesque sem. Sed dignissim finibus diam
            a faucibus. faucibus.
          </p>
        </div>
      </div>
      <div className="flex gap-4 items-center sm:flex-row flex-col">
        <div className=" p-4 bg-yellow-600 text-white rounded-full">
          <LeafIcon size={40} />
        </div>
        <div className="sm:text-left text-center">
          <h3 className="text-2xl font-bold mb-2">What</h3>
          <p className="sm:text-md text-sm text-slate-500 font-medium">
            nunc vitae, vulputate ullamcorper neque. Nullam eget vehicula
            ligula, ac porttitor augue. Aliquam felis odio, convallis quis felis
            eu, ultrices pellentesque sem. Sed dignissim finibus diam a
            faucibus. eu, ultrices pellentesque sem. Sed dignissim finibus diam
            a faucibus. faucibus.
          </p>
        </div>
      </div>
    </div>
  );
};
export default Questions;
