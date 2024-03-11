import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IProductList } from "../lib/types/productList";
import { IProduct } from "../lib/types/products";
import { sortByCheapest, sortByExpensive } from "../utilities/sortByCost";
import { newestProductsFn } from "../utilities/sortByTimeStamp";

const initialState: IProductList = {
  productsList: [],
};

const SortedProductsListSlice = createSlice({
  name: "sortedProductsList",
  initialState,
  reducers: {
    sortProductsList(
      state,
      action: PayloadAction<{ productsList: IProduct[]; sortBasedOn: string }>
    ) {
      switch (action.payload.sortBasedOn) {
        case "all":
          state.productsList = action.payload.productsList;
          break;
        case "newestProducts": {
          state.productsList = newestProductsFn(state.productsList);
          break;
        }
        case "cheapest": {
          state.productsList = state.productsList.sort(sortByCheapest);
          break;
        }
        case "expensive": {
          state.productsList = state.productsList.sort(sortByExpensive);
          break;
        }
        case "promo": {
          state.productsList = state.productsList.filter(
            (product) => product.discount && product.discount > 0
          );
          break;
        }
      }
    },
  },
});
export const SortedProductsListActions = SortedProductsListSlice.actions;

export default SortedProductsListSlice.reducer;
