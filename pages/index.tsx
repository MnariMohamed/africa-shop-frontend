import React from "react";
const Brands = dynamic(() => import("../components/brands"));
import Carousel from "../components/carousel";
import dynamic from "next/dynamic";

const Home = () => {
  return (
    <div>
      <Carousel />
      <Brands />
    </div>
  );
};

export default Home;
