import React from "react";
import Image from "next/image";
import Link from "next/link";
import StarRatingComponent from "react-star-rating-component";
import { IProduct } from "../../../lib/types/products";
import CardActions from "./CardActions";
import ProductPrice from "../ProductPrice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { setProduct } from "@/store/api";
import { AppDispatch } from "@/store";
import { useWindowDimensions } from "@/hooks/useWindowDimensions";

interface Props {
  product: IProduct;
  displayStars?: boolean;
}

const Card: React.FC<Props> = ({ product, displayStars }) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleProductClick = () => {
    dispatch(setProduct(product));
    router.push(
      `/${product.category.name}/${product.category.name}/${product.category.name}/${product.id}`
    );
  };

  const { width } = useWindowDimensions();
  const discountIcon = width <= 768 ? 30 : 40;

  return (
    <div
      className="max-w-sm bg-white shadow-lg rounded-lg my-4 mx-4 cursor-pointer relative"
      onClick={handleProductClick}
    >
      <div className="relative w-full h-48">
        {" "}
        {/* Adjust the height as needed */}
        <Image
          src={product.images[0]?.path || "/images/placeholder.png"}
          layout="fill"
          className="object-cover rounded-t-lg"
          alt={product.name}
        />
        {product?.discount && (
          <span className="w-8 sm:w-auto absolute top-1 right-1">
            <Image
              src="/images/discount-icon/discount.webp"
              width={discountIcon}
              height={discountIcon}
              alt="discount-icon"
            />
          </span>
        )}
      </div>

      <div className="px-5 py-4">
        <p className="text-sm font-extralight sm:text-[0.75rem] text-start text-palette-mute line-clamp-2">
          Category : {product.category.name}
        </p>

        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          {product.name}
        </h2>
        <p className="text-gray-600 mt-1 line-clamp-3">{product.description}</p>
      </div>
      <div className="flex items-center justify-between px-4 py-2">
        {displayStars && (
          <StarRatingComponent
            name={`product_rate_${product.name}`}
            starCount={5}
            value={2} // Replace with your actual rating value
          />
        )}
        <ProductPrice price={product.price} discount={product.discount} />
      </div>
      <div className="px-4 py-2 flex justify-end">
        <button
          onClick={handleProductClick}
          className="text-xs text-indigo-600 hover:underline"
        >
          Voir détails
        </button>
      </div>
      <CardActions product={product} />
    </div>
  );
};

export default Card;
