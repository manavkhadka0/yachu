import Image from "next/image";
import React from "react";

const SurveyHero = () => {
  return (
    <div className="flex gap-2 flex-col md:flex-row items-end">
      <div className="">
        <Image
          src="/logo.svg"
          alt="me"
          width="500"
          height="500"
          className="w-60"
        />
      </div>
      <h1 className="text-4xl font-bold text-center mb-4"> Survey</h1>
    </div>
  );
};

export default SurveyHero;
