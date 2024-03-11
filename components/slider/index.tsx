import Slider from "react-slick";
import SlideCard from "./SecondSliderCard";
import { secondSlider } from "../../mock/secondSlider";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import Placeholder from "../UI/Placeholder";

const SecondSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4500,
    cssEase: "linear",
    appendDots: (dots: string) => (
      <div className="bg-transparent !pb-[40px]">
        <ul> {dots} </ul>
      </div>
    ),
  };

  const { loading, sliders } = useSelector((state: RootState) => state.sliders);
  return (
    <div className="container mx-auto my-6 w-full">
      {loading ? (
        <Placeholder width={"w-[100%]"} height={"h-[35vh]"} />
      ) : (
        <Slider {...settings}>
          {sliders.map((item) => {
            return <SlideCard key={item.id} item={item} />;
          })}
        </Slider>
      )}
    </div>
  );
};

export default SecondSlider;
