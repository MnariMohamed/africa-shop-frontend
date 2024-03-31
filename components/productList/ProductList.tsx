import React, { useEffect, useState } from "react";
import { useLanguage } from "../../hooks/useLanguage";
import { IProduct } from "../../lib/types/products";
import SubmenuCategory from "./SubmenuCategory";
import Card from "../UI/card/Card";
import Breadcrumb from "../UI/Breadcrumb";
import Sort from "./Sort";
import { useDispatch, useSelector } from "react-redux";
import { getSortedProducts } from "../../store/sortedProductList-slice";
import { useRouter } from "next/router";
import { IProductListRootState } from "../../lib/types/productList";
import { AppDispatch, RootState } from "@/store";
import Pagination from "../UI/Pagination";
import Placeholder from "../UI/Placeholder";
import { getProductsBySearch } from "@/store/api";
import { LoadingPlaceholder } from "../UI/LoadingPlaceholder";
import { useProductSorting } from "@/hooks";

const ProductList: React.FC = () => {
  const { t } = useLanguage();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const isSearch = router.pathname.includes("search");
  const query = router.query.queryPhrase;

  const [currentPage, setCurrentPage] = useState<number>(1);
  const { selectedRadioBtn, setSelectedRadioBtn } = useProductSorting(
    dispatch,
    currentPage
  );

  const { sortedProductList, pagination, loading } = useSelector(
    (state: IProductListRootState) => state.sortedProductsList
  );

  const {
    searchedProducts,
    pagination: searchPagination,
    loading: searchLoading,
  } = useSelector((state: RootState) => state.products);

  const productsList = isSearch ? searchedProducts : sortedProductList;
  const productsPagination = isSearch ? searchPagination : pagination;
  const productsLoading = isSearch ? searchLoading : loading;

  useEffect(() => {
    if (isSearch && query) {
      dispatch(
        getProductsBySearch({
          search: query as string,
          page: currentPage,
          limit: 28,
        })
      );
    }
  }, [dispatch, currentPage, query, isSearch]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  function onChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setSelectedRadioBtn(e.currentTarget.id);
    setCurrentPage(1);
  }

  return (
    <div className="my-4 md:my-8">
      {!isSearch ? (
        <>
          <Breadcrumb />
          <SubmenuCategory />
        </>
      ) : null}
      <div className="mx-auto flex flex-col xl:max-w-[2130px]">
        {!isSearch ? (
          <Sort
            selectedBtn={selectedRadioBtn}
            onChangeSelectedBtn={onChangeHandler}
          />
        ) : null}
        {productsList && productsList.length > 0 ? (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {!productsLoading
                ? productsList.map((product: IProduct) => {
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
                  })}
            </div>
            <Pagination
              total={productsPagination.total}
              limit={productsPagination.limit}
              page={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        ) : isSearch ? (
          <div
            className="bg-white border border-palette-secondary text-palette-secondary px-4 py-3 rounded relative"
            role="alert"
          >
            <strong className="font-bold my-4">{`PHRASE RECHERCHÉE : "${query}"`}</strong>
            <br />
            <br />
            <span className="block sm:inline">{`Votre recherche "${query}" n'a pas été retrouvée\nVérifiez si l'expression cherchée a été saisie correctement ou utilisez d'autres descriptions.`}</span>
            <span className="absolute top-0 bottom-0 right-0 px-4 py-3"></span>
          </div>
        ) : (
          <p className="text-palette-mute text-center mt-8">{t.noProduct}</p>
        )}
      </div>
    </div>
  );
};

export default ProductList;
