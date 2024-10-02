import React from "react";
import SectionTitle from "../../../components/SectionTitle";
import featured from "../../../assets/home/featured.jpg";
const Featured = () => {
  return (
    <div className="featured pt-8 bg-fixed bg-opacity-20">
      <SectionTitle heading={"check it out"} subHeading={"featured item"} />
      <div className="md:flex justify-center items-center py-24 px-36 md:gap-5 bg-white/20">
        <div className="">
          <img src={featured} alt="" />
        </div>
        <div className="text-white">
          <p>Aug 20, 2029</p>
          <p className="uppercase ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Reprehenderit repudiandae deserunt aspernatur dolor corporis
            consequatur vel culpa rerum tempore quia fugiat molestias adipisci
            autem ad consectetur necessitatibus labore, veritatis perspiciatis
            vitae amet. Temporibus porro quisquam provident consequatur voluptas
            molestiae rerum pariatur optio sequi dolorem accusamus repellendus
            modi, inventore est tenetur?
          </p>
          <button className="btn btn-outline text-white border-0 border-b-4">
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Featured;
