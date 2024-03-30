import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Ip_port } from "../../constants";
import { IProduct, ProductResponse, ProductState } from "@/lib/types/products";
import { products } from "@/mock/products";

const PRODUCTS_URL = `${Ip_port.Adresse}/api/products`;

const initialState: ProductState = {
  homeProducts: [],
  searchedProducts: [],
  currentProduct: {} as IProduct,
  similarProducts: [],
  loading: false,
  error: {},
  pagination: {
    page: 1,
    limit: 28,
    total: 0,
  },
};

export const getHomeProducts = createAsyncThunk(
  "redux/products/getHomeProducts",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${PRODUCTS_URL}?sort=createdAt%2CASC&join=images&join=category&limit=12`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getSimilarProducts = createAsyncThunk(
  "redux/products/getSimilarProducts",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${PRODUCTS_URL}?join=images&join=category`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getProductsBySearch = createAsyncThunk(
  "redux/products/getProductsBySearch",
  async (
    {
      search,
      page = 1,
      limit = 28,
      sortedBy = "createdAt%2CASC",
    }: { search: string; page?: number; limit?: number; sortedBy?: string },
    { rejectWithValue }
  ) => {
    const searchQuery = {
      $or: [{ name: { $cont: search } }, { description: { $cont: search } }],
    };
    const queryString = `s=${encodeURIComponent(JSON.stringify(searchQuery))}`;
    const searchApiUrl = `${PRODUCTS_URL}?${queryString}&sort=${sortedBy}&join=images&join=category&limit=${limit}&page=${page}`;
    try {
      const response = await axios.get(searchApiUrl, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return {
        data: response.data.data,
        pagination: { page, limit, total: response.data.total },
      };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const productsSlicer = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProduct(state, action) {
      state.currentProduct = action.payload;
    },
  },
  extraReducers: {
    [getHomeProducts.pending.type]: (state) => ({ ...state, loading: true }),
    [getHomeProducts.fulfilled.type]: (state, action) => ({
      ...state,
      homeProducts: action.payload?.map((product: ProductResponse) => ({
        id: product.id,
        name: product.name,
        price: product.price,
        description: product.description,
        quantity: product.quantity,
        discount: product.discount,
        status: product.status,
        images: product.images,
        category: product.category,
        createdAt: product.createdAt,
      })),
      loading: false,
    }),
    [getHomeProducts.rejected.type]: (state, action) => ({
      ...state,
      error: action.payload,
      loading: false,
    }),
    [getSimilarProducts.pending.type]: (state) => ({ ...state, loading: true }),
    [getSimilarProducts.fulfilled.type]: (state, action) => ({
      ...state,
      similarProducts: action.payload.filter(
        (product: ProductResponse) =>
          product.category.id === state.currentProduct.category.id
      ),
      loading: false,
    }),
    [getSimilarProducts.rejected.type]: (state, action) => ({
      ...state,
      error: action.payload,
      loading: false,
    }),
    [getProductsBySearch.pending.type]: (state) => ({
      ...state,
      loading: true,
    }),
    [getProductsBySearch.fulfilled.type]: (state, action) => ({
      ...state,
      searchedProducts: action.payload.data.map((product: ProductResponse) => ({
        id: product.id,
        name: product.name,
        price: product.price,
        description: product.description,
        quantity: product.quantity,
        discount: product.discount,
        status: product.status,
        images: product.images,
        category: product.category,
        createdAt: product.createdAt,
      })),
      pagination: action.payload.pagination,
      loading: false,
    }),
    [getProductsBySearch.rejected.type]: (state, action) => ({
      ...state,
      error: action.payload,
      loading: false,
    }),
  },
});

export default productsSlicer.reducer;
export const { setProduct } = productsSlicer.actions;
