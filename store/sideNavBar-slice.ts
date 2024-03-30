import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ICategory } from "../lib/types/subCategories";
import axios from "axios";
import { ISideNavBar } from "../lib/types/sidebar";
import { Ip_port } from "@/constants";

const CATEGORIES_URL = `${Ip_port.Adresse}/api/category`;

const initialState: ISideNavBar = {
  isSidebarOpen: false,
  isNavbarOpen: false,
  isNextSideBarOpen: false,
  nextSideBarLevel: 0,
  subCatList: [],
  nextSubCatList: [],
  category: "",
};

export const getNestedCategories = createAsyncThunk(
  "sideNavBar/getNestedCategories",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${CATEGORIES_URL}/nested`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const sideNavBarSlice = createSlice({
  name: "sideNavBar",
  initialState,
  reducers: {
    openSidebar(state) {
      state.isSidebarOpen = true;
    },

    openNextSidebar(state) {
      state.isNextSideBarOpen = true;
    },

    openNavbar(state) {
      state.isNavbarOpen = true;
    },

    closeSidebar(state) {
      state.isSidebarOpen = false;
    },

    closeNextSidebar(state) {
      state.isNextSideBarOpen = false;
    },

    closeNavbar(state) {
      state.isNavbarOpen = false;
      state.isSidebarOpen = false;
      state.isNextSideBarOpen = false;
      //state.subCatList = [];
      // state.nextSubCatList = [];
    },

    setSidebarEntries(state, action: PayloadAction<ICategory[]>) {
      state.subCatList = action.payload;
    },

    setNextSidebarEntries(state, action: PayloadAction<ICategory[]>) {
      state.nextSubCatList = action.payload;
    },
  },
  extraReducers: {
    [getNestedCategories.pending.type]: (state) => ({
      ...state,
      loading: true,
    }),
    [getNestedCategories.fulfilled.type]: (state, action) => ({
      ...state,
      subCatList: action.payload.map((item: any) => ({
        id: item.id,
        name: item.name,
        icon: item.icon.path,
        subCategories: item.subCategories.map((sub: any) => ({
          id: sub.id,
          name: sub.name,
          icon: sub.icon,
          level: sub.level,
          subCategories: sub.subCategories || undefined,
        })),
        level: item.level,
      })),
      loading: false,
    }),
    [getNestedCategories.rejected.type]: (state, action) => ({
      ...state,
      error: action.payload,
      loading: false,
    }),
  },
});

export const sideNavBarActions = sideNavBarSlice.actions;

export default sideNavBarSlice.reducer;
