import type { NextPage } from "next";
import { useEffect } from "react";
import ProductList from "../components/productList/ProductList";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { getNewProducts } from "@/store/api";
import { useSelector } from "react-redux";

const NewestProduct: NextPage = () => {
  /*   const dispatch = useDispatch<AppDispatch>();
  const { page, limit } = useSelector(
    (state: RootState) => state.products.pagination
  );

  useEffect(() => {
    dispatch(getNewProducts({ page, limit }));
  }, [dispatch, page, limit]); */

  return <ProductList />;
};

export default NewestProduct;
