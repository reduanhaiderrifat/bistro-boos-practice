import React, { useEffect, useState } from "react";
const useMenu = () => {
  const [menus, setMenus] = useState();
  useEffect(() => {
    fetch("https://bistro-boss-practive-recap-server.vercel.app/menu")
      .then((res) => res.json())
      .then((data) => {
        setMenus(data);
      });
  }, []);
  return [menus];
};

export default useMenu;
