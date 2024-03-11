import React, { useEffect, useState } from "react";
import { useLanguage } from "../../hooks/useLanguage";
import { IProduct } from "../../lib/types/products";
import SubmenuCategory from "./SubmenuCategory";
import Card from "../UI/card/Card";
import Breadcrumb from "../UI/Breadcrumb";
import Sort from "./Sort";
import { useDispatch, useSelector } from "react-redux";
import { SortedProductsListActions } from "../../store/sortedProductList-slice";
import { useRouter } from "next/router";
import { IProductListRootState } from "../../lib/types/productList";
import { AppDispatch, RootState } from "@/store";
import { getNewProducts } from "@/store/api";
import Pagination from "../UI/Pagination";
import Placeholder from "../UI/Placeholder";

interface Props {
  productList?: IProduct[];
}
const ProductList: React.FC<Props> = ({ productList }) => {
  const router = useRouter();
  const { t } = useLanguage();
  let isInNewestProductsPage =
    router.pathname === "/newestProducts" ? true : false;

  const [selectedRadioBtn, setSelectedRadioBtn] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const dispatch = useDispatch<AppDispatch>();

  const { newProducts, pagination, loading } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    dispatch(
      SortedProductsListActions.sortProductsList({
        productsList: productList ?? [],
        sortBasedOn: selectedRadioBtn,
      })
    );
  }, [dispatch, productList, selectedRadioBtn]);

  const sortedProductList = useSelector(
    (state: IProductListRootState) => state.sortedProductsList.productsList
  );

  function onChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setSelectedRadioBtn(e.currentTarget.id);
  }

  useEffect(() => {
    dispatch(getNewProducts({ page: currentPage }));
  }, [dispatch, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="my-4 md:my-8">
      <Breadcrumb />
      <SubmenuCategory />
      <div className="mx-auto flex flex-col xl:max-w-[2130px]">
        {isInNewestProductsPage && newProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {
              /* productList */ !loading
                ? newProducts.map((product: IProduct) => {
                    return <Card key={product.name} product={product} />;
                  })
                : [1, 2, 3, 4, 5, 6].map((number) => {
                    return (
                      <Placeholder
                        key={number}
                        width={"40rem"}
                        height={"12rem"}
                      />
                    );
                  })
            }
          </div>
        ) : sortedProductList && sortedProductList.length > 0 ? (
          <div>
            <Sort
              selectedBtn={selectedRadioBtn}
              onChangeSelectedBtn={onChangeHandler}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {sortedProductList.map((product: IProduct) => {
                return <Card key={product.name} product={product} />;
              })}
            </div>
          </div>
        ) : (
          <p className="text-palette-mute text-center mt-8">{t.noProduct}</p>
        )}
        {newProducts.length > 0 && isInNewestProductsPage && (
          <Pagination
            total={pagination.total}
            limit={pagination.limit}
            page={currentPage}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
};

export default ProductList;
