import React, { useEffect } from "react";
import Carousel from "../components/carousel";
import dynamic from "next/dynamic";
import SecondSlider from "@/components/slider";
import { AppDispatch, RootState } from "@/store";
import { useDispatch } from "react-redux";
import { getBrands, getHomeProducts, getSliders } from "@/store/api";
import { useSelector } from "react-redux";
import { getNestedCategories } from "@/store/sideNavBar-slice";
import { IUserInfoRootState } from "@/lib/types/user";

const BrandsList = dynamic(() => import("@/components/brandsList/BrandsList"));
const Brands = dynamic(() => import("@/components/brands"));
const Newest = dynamic(() => import("@/components/newest/Newest"));
const About = dynamic(() => import("@/components/aboutUs"));
const Welcome = dynamic(() => import("@/components/welcome/Welcome"));

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { user } = useSelector((state: IUserInfoRootState) => {
    return state.userInfo;
  });

  useEffect(() => {
    dispatch(getSliders());
    dispatch(getBrands());
    dispatch(getHomeProducts());
    dispatch(getNestedCategories());
  }, [dispatch]);

  return (
    <div className="px-4 md:px-2 items-center">
      {user?.firstName ? <Welcome user={user} /> : null}
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
