import React from "react";
import MenuItem from "../../../components/MenuItem";

const MenuCategory = ({ items }) => {
  return (
    <div>
      <div className="grid grid-cols-2 gap-4 w-4/5 mx-auto">
        {items?.map((menu) => (
          <MenuItem item={menu} key={menu._id} />
        ))}
      </div>
    </div>
  );
};

export default MenuCategory;
