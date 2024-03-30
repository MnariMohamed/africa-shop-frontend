import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import { IProductList } from "../lib/types/productList";
import { IProduct, ProductResponse } from "../lib/types/products";
import { sortByCheapest, sortByExpensive } from "../utilities/sortByCost";
import { newestProductsFn } from "../utilities/sortByTimeStamp";
import { Ip_port } from "@/constants";
import axios from "axios";

const initialState: IProductList = {
  sortedProductList: [],
  loading: false,
  pagination: {
    page: 1,
    limit: 28,
    total: 0,
  },
};

const PRODUCTS_URL = `${Ip_port.Adresse}/api/products`;

export const getSortedProducts = createAsyncThunk(
  "redux/products/getSortedProducts",
  async (
    {
      sortedBy,
      page = 1,
      limit = 28,
      filterBy = "",
    }: { sortedBy: string; page?: number; limit?: number; filterBy?: string },
    { rejectWithValue }
  ) => {
    try {
      let url = `${PRODUCTS_URL}?sort=${sortedBy}&join=images&join=category&limit=${limit}&page=${page}`;
      if (filterBy) {
        url += `&${filterBy}`;
      }
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return {
        data: response.data.data, // Your data
        pagination: { page, limit, total: response.data.total },
      };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const SortedProductsListSlice = createSlice({
  name: "sortedProductsList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSortedProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getSortedProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.sortedProductList = action.payload.data;
      state.pagination = action.payload.pagination;
    });
    builder.addCase(getSortedProducts.rejected, (state) => {
      state.loading = false;
    });
  },
});
export const SortedProductsListActions = SortedProductsListSlice.actions;

export default SortedProductsListSlice.reducer;
