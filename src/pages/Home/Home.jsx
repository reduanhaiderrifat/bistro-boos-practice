import React from "react";
import Banner from "./components/Banner";
import Caregory from "./components/Caregory";
import PopularMenu from "./components/PopularMenu";
import Featured from "./components/Featured";
import Testimonials from "../../components/Testimonials";

const Home = () => {
  return (
    <div>
      <Banner />
      <Caregory />
      <PopularMenu />
      <Featured />
      <Testimonials />
    </div>
  );
};

export default Home;
