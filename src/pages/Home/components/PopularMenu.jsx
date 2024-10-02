import React, { useEffect, useState } from "react";
import SectionTitle from "../../../components/SectionTitle";
import MenuItem from "../../../components/MenuItem";
import useMenu from "../../../hooks/useMenu";

const PopularMenu = () => {
  const [menus] = useMenu();
  const popularItems = menus?.filter((item) => item?.category === "popular");

  console.log(menus);
  return (
    <div className="my-5">
      <SectionTitle subHeading={"Popular Items"} heading={"From Our Menu"} />
      <div className="grid grid-cols-2 gap-4 w-4/5 mx-auto">
        {popularItems?.map((menu) => (
          <MenuItem item={menu} key={menu._id} />
        ))}
      </div>
      <div className="w-1/3 mt-4 mx-auto flex justify-center">
        <button className="btn w-full  btn-outline  border-0 border-b-4">
          Order Now
        </button>
      </div>
    </div>
  );
};

export default PopularMenu;
