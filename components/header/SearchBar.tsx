import React, { useState } from "react";

import { GoSearch } from "react-icons/go";
import { useLanguage } from "../../hooks/useLanguage";
import { getProductsBySearch } from "@/store/api";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { useRouter } from "next/router";

//TODO: search by product name.
const SearchBar = () => {
  const { t } = useLanguage();

  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const onSearchSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      getProductsBySearch({
        search: searchTerm,
        page: 1,
        limit: 28,
      })
    );
    setSearchTerm("");
    router.push(`/search?queryPhrase=${searchTerm}`);
  };

  return (
    <form
      onSubmit={onSearchSubmit}
      className="max-w-[50rem] w-full md:w-[90%] px-4 md:ml-4 md:mr-4 rounded-lg border-gray-400 border-[1px] bg-slate-800 flex items-center flex-grow"
    >
      <input
        className="px-4 py-2 md:py-3 bg-transparent outline-none w-full "
        type="search"
        placeholder={`${t.search}`}
        value={searchTerm}
        onChange={onSearch}
      />
      <button type="submit" className="cursor-pointer">
        <GoSearch style={{ color: "rgb(156 163 175)" }} />
      </button>
    </form>
  );
};

export default SearchBar;
