import { policyConfig } from "@/utils/config";
import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        {policyConfig.title}
      </h1>
      <p className="mb-6">{policyConfig.introduction}</p>

      {policyConfig.sections.map((section, index) => (
        <div key={index} className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
          <p className="mb-4">{section.content}</p>
          {section.list && (
            <ul className="list-disc pl-6 mb-4">
              {section.list.map((item, i) => (
                <li key={i} className="mb-2">
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}

      <p className="mt-8 text-sm text-gray-600">
        Last updated: {policyConfig.lastUpdated}
      </p>
    </div>
  );
};

export default PrivacyPolicy;
