import { LeafIcon } from "lucide-react";

const Questions = () => {
  return (
    <div className="container flex flex-col gap-8 mb-20 mt-6">
      <div className="flex gap-4 items-center sm:flex-row flex-col">
        <div className=" p-4 bg-lime-600 text-white rounded-full">
          <LeafIcon size={40} />
        </div>
        <div className=" sm:text-left text-center">
          <h3 className="text-2xl font-bold mb-2">Why ?</h3>
          <p className="sm:text-base text-sm text-slate-500 font-medium">
            We understand that hair is more than just strands – it&apos;s a
            reflection of one&apos;s identity and confidence.
          </p>
        </div>
      </div>
      <div className="flex gap-4 items-center sm:flex-row flex-col">
        <div className=" p-4 bg-amber-700 text-white rounded-full">
          <LeafIcon size={40} />
        </div>
        <div className="sm:text-left text-center">
          <h3 className="text-2xl font-bold mb-2">How ?</h3>
          <p className="sm:text-base text-sm text-slate-500 font-medium">
            Yachu Hair Oil stands apart through the artistry of our
            formulations, which marry traditional techniques with modern
            precision. Our proprietary blends feature a harmonious selection of
            natural oils – coconut, olive, almond, and castor oils –
            time-honored ingredients renowned for their hair-nourishing
            properties.
          </p>
        </div>
      </div>
      <div className="flex gap-4 items-center sm:flex-row flex-col">
        <div className=" p-4 bg-yellow-600 text-white rounded-full">
          <LeafIcon size={40} />
        </div>
        <div className="sm:text-left text-center">
          <h3 className="text-2xl font-bold mb-2">What ?</h3>
          <p className="sm:text-base text-sm text-slate-500 font-medium">
            Yachu Hair Oil is not just a product; it&apos;s a promise to care
            for your hair and the planet simultaneously.
          </p>
        </div>
      </div>
    </div>
  );
};
export default Questions;
