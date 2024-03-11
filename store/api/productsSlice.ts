import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Ip_port } from "../../constants";
import { IProduct, ProductResponse, ProductState } from "@/lib/types/products";
import { products } from "@/mock/products";

const PRODUCTS_URL = `${Ip_port.Adresse}/api/products`;

const initialState: ProductState = {
  homeProducts: [],
  newProducts: [],
  currentProduct: {} as IProduct,
  loading: false,
  error: {},
  pagination: {
    page: 1, // Current page
    limit: 28, // Items per page
    total: 0, // Total number of products
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

export const getNewProducts = createAsyncThunk(
  "redux/products/getNewProducts",
  async (
    { page = 1, limit = 28 }: { page?: number; limit?: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.get(
        `${PRODUCTS_URL}?sort=createdAt%2CASC&join=images&join=category&limit=${limit}&page=${page}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return {
        data: response.data.data, // Your data
        pagination: { page, limit, total: response.data.total }, // Pagination data from headers or response body
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
    [getNewProducts.pending.type]: (state) => ({ ...state, loading: true }),
    [getNewProducts.fulfilled.type]: (state, action) => ({
      ...state,
      newProducts: action.payload.data.map((product: ProductResponse) => ({
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
    [getNewProducts.rejected.type]: (state, action) => ({
      ...state,
      error: action.payload,
      loading: false,
    }),
  },
});

export default productsSlicer.reducer;
export const { setProduct } = productsSlicer.actions;
