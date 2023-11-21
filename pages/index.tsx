import React, { useEffect } from "react";
import type { NextPage } from "next";
import dynamic from "next/dynamic";
import Carousel from "../components/carousel";

const Home = () => {
  return (
    <div>
      <Carousel />
    </div>
  );
};

export default Home;
