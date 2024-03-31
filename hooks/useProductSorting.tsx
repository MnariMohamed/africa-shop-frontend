import { useState, useEffect } from "react";
import { AppDispatch } from "@/store";
import { getSortedProducts } from "@/store/sortedProductList-slice";

export const useProductSorting = (
  dispatch: AppDispatch,
  currentPage: number
) => {
  const [selectedRadioBtn, setSelectedRadioBtn] = useState("newestProducts");

  useEffect(() => {
    const createDispatch = () => {
      let filterBy = "";
      switch (selectedRadioBtn) {
        case "newestProducts":
          dispatch(
            getSortedProducts({
              page: currentPage,
              sortedBy: "createdAt%2CASC",
              limit: 28,
            })
          );
          break;
        case "cheapest":
          dispatch(
            getSortedProducts({
              page: currentPage,
              sortedBy: "price%2CASC",
              limit: 28,
            })
          );
          break;
        case "expensive":
          dispatch(
            getSortedProducts({
              page: currentPage,
              sortedBy: "price%2CDESC",
              limit: 28,
            })
          );
          break;
        case "promo":
          filterBy = "filter=discount||$isnull"; // This is URL-encoded for "discount>0"
          dispatch(
            getSortedProducts({
              page: currentPage,
              sortedBy: "discount%2CDESC",
              limit: 28,
              filterBy,
            })
          );
          break;
      }
    };
    createDispatch();
  }, [dispatch, currentPage, selectedRadioBtn]);

  return { selectedRadioBtn, setSelectedRadioBtn };
};
