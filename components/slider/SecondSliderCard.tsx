import { Slider } from "@/lib/types/sliders/sliders";
import Image from "next/image";

interface SlideCardParams {
  item: Slider;
}

const SlideCard: React.FC<SlideCardParams> = ({ item }) => {
  const truncatedDescription =
    item.description && item.description.length > 20
      ? item.description.substring(0, 20) + "..."
      : item.description;

  return (
    <div className="relative mx-auto bg-white p-4 rounded-md shadow-md flex items-center">
      <div className="absolute top-0 right-0 w-[20%] h-[100%] border-t-8 border-r-8 border-palette-tertiary"></div>
      <div className="flex-1 m-4">
        {" "}
        {/* Content takes the remaining space */}
        <div className="mb-4">
          <h2 className="md:text-4xl text-xl font-bold mb-6">{item.name}</h2>
        </div>
        <div>
          <p className="text-gray-500 my-4 md:text-lg text-sm">
            {truncatedDescription}
          </p>
        </div>
        <button
          type="button"
          className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Plus d&apos;information
        </button>
      </div>
      <div className="flex-1 ml-4 relative h-full min-h-[200px]">
        {" "}
        {/* Adjust minimum height as needed */}
        <Image
          src={item.imageUrl}
          alt={item.name || "slide image"}
          layout="fill"
          className="rounded-md object-cover"
        />
      </div>
    </div>
  );
};

export default SlideCard;
