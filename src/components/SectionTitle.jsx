import React from "react";

const SectionTitle = ({ heading, subHeading }) => {
  return (
    <div className="md:w-3/4 mx-auto text-center my-8">
      <p className="text-yellow-600">---{heading}---</p>
      <p className="text-4xl uppercase border-y-4 py-4 font-semibold">
        {subHeading}
      </p>
    </div>
  );
};

export default SectionTitle;
