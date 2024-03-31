import { IProduct } from "./products";

export interface IProductList {
  sortedProductList: IProduct[] | [];
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
  loading: boolean;
}

export interface IProductListRootState {
  sortedProductsList: IProductList;
}
