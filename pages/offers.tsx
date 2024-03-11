import type { NextPage } from "next";
import { GetStaticProps } from "next";
import { IProduct } from "../lib/types/products";
import ProductList from "../components/productList/ProductList";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import axios from "axios";
import { Ip_port } from "@/constants";

const Offers: NextPage<{
  products: IProduct[];
}> = ({ products }) => {
  return (
    <div>
      <ProductList productList={products} />
    </div>
  );
};

export default Offers;

export const getStaticProps: GetStaticProps = async () => {
  const PRODUCTS_URL = `${Ip_port.Adresse}/api/products?join=images&join=category`;

  try {
    const response = await axios.get(`${PRODUCTS_URL}`);
    const products = response.data;

    return {
      props: {
        products,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return {
      props: {
        products: [],
      },
    };
  }
};
