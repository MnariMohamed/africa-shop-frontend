import React from "react";
import BrandBox from "./BrandBox";
import { brandContent } from "../../mock/brand";
import Slider from "react-slick";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const Brands = () => {
  const { loading, brands } = useSelector((state: RootState) => state.brands);

  const settings = {
    useTransform: true,
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 15000,
    slidesToShow: 8,
    slidesToScroll: brands.length, // Adjusted for dynamic sliding based on brands length
    autoplaySpeed: 8000,
    cssEase: "linear",
    swipeToSlide: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
    ],
  };

  return (
    <div className="md:p-1 my-2 mx-2 md:mx-0">
      <Slider {...settings}>
        {brands.map((brandItem) => {
          return (
            <BrandBox
              key={brandItem.id}
              brandName={brandItem.name}
              imageSrc={brandItem.logo}
              loading={loading}
            />
          );
        })}
      </Slider>
    </div>
  );
};

export default Brands;
