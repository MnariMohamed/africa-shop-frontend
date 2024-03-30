import React from "react";
import { IProduct } from "../../lib/types/products";
import Breadcrumb from "../UI/Breadcrumb";
import ImageSection from "./ImageSection";
import DetailsSection from "./DetailsSection";
import Benefits from "../Benefits";
import SimilarProducts from "./SimilarProducts";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

/* interface Props {
  product: IProduct;
} */

// TOTO: Chnage the product to use currentProduct from the store

const ProductDetails: React.FC /* <Props> */ = () => {
  const { currentProduct } = useSelector((state: RootState) => state.products);

  const { similarProducts } = useSelector((state: RootState) => state.products);

  return (
    <div className="flex flex-col">
      {/* <Breadcrumb /> */}
      <div className="w-full xl:max-w-[2100px] mx-auto">
        <div className="flex flex-col md:flex-row flex-wrap md:flex-nowrap items-center md:items-start mt-8 relative">
          <ImageSection
            imgArray={currentProduct.images}
            product={currentProduct}
          />
          <DetailsSection product={currentProduct} />
        </div>
        <div className="border-2 my-8">
          <Benefits />
        </div>
        {similarProducts.length > 0 && (
          <SimilarProducts products={similarProducts} />
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
