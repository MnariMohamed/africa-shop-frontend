import React from "react";
import Carousel from "../components/carousel";
import dynamic from "next/dynamic";
import SecondSlider from "@/components/slider";

const BrandsList = dynamic(() => import("@/components/brandsList/BrandsList"));
const Brands = dynamic(() => import("@/components/brands"));
const Newest = dynamic(() => import("@/components/newest/Newest"));
const About = dynamic(() => import("@/components/aboutUs"));

const Home = () => {
  return (
    <div className="px-4 md:px-2 items-center">
      <Carousel />
      <Brands />
      <Newest />
      <SecondSlider />
      <BrandsList />
      <About />
    </div>
  );
};

export default Home;
