import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navber from "../shared/Navber";
import Footer from "../shared/Footer";

const MainlayOut = () => {
  const location = useLocation();
  const nHF =
    location?.pathname?.includes("login") ||
    location?.pathname?.includes("signup") ||
    location?.pathname?.includes("dashboard");
  return (
    <div className="container mx-auto">
      {nHF || <Navber />}
      <div className="min-h-[calc(100vh-272px)]">
        <Outlet />
      </div>
      {nHF || <Footer />}
    </div>
  );
};

export default MainlayOut;
