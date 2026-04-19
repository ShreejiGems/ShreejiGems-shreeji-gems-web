import React from "react";
import { LuSearch } from "react-icons/lu";
import { garamond } from "@/src/common/helper";

const SearchBar = ({ search, setSearch, handleSearch, hoveredItem }: any) => {
  return (
    <div className="flex items-center relative w-full">
      <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-[20px] h-[20px] text-black" />
      <input
        type="text"
        placeholder="Search for Gold Jewellery, Diamond Jewellery and more…"
        className={`pl-10 pr-4 md:py-2 py-1 w-full h-auto rounded-[10px] border-none text-black placeholder:text-gray-500 focus:outline-none ${hoveredItem ? "!bg-gray-300" : "bg-white"} ${garamond.className}`}
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          handleSearch(e.target.value);
        }}
      />
    </div>
  );
};

export default SearchBar;
