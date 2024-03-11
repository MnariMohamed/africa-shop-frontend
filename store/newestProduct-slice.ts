import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IProduct } from "../lib/types/products";
import { IProductList } from "../lib/types/productList";
import { products } from "@/mock/products";

const initialState: IProductList = {
  productsList: products,
};

const newestProductsSlice = createSlice({
  name: "newestProducts",
  initialState,
  reducers: {
    addProducts(state, action: PayloadAction<IProduct[]>) {
      state.productsList = action.payload;
    },
  },
});

export const newestProductsActions = newestProductsSlice.actions;

export default newestProductsSlice.reducer;
