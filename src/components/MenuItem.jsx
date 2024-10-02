import React from "react";

const MenuItem = ({ item }) => {
  const { image, name, price, recipe } = item;
  return (
    <div className="flex gap-4">
      <img
        style={{ borderRadius: "0 200px 200px 200px" }}
        className="w-[100px]"
        src={image}
        alt=""
      />
      <div className="">
        <h2 className="uppercase">{name}-----------</h2>
        <p>{recipe}</p>
        <p className="text-yellow-600">${price}</p>
      </div>
    </div>
  );
};

export default MenuItem;
