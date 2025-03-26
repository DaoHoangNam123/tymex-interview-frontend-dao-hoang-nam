"use client";

import React, { useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import { sortCategory } from "@/store/market/marketSlice";
import Image from "next/image";
import { CATERGORY_LIST } from "@/src/constants/common";

interface FilterBarProps {
  categories?: string[];
}

const FilterBar = ({ categories = CATERGORY_LIST }: FilterBarProps) => {
  const [current, setCurrent] = useState("All");
  const dispatch = useAppDispatch();

  const onClick = (e: string) => {
    setCurrent(e);
    dispatch(sortCategory(e));
  };

  return (
    <div className="flex items-center space-x-2 overflow-x-auto pl-10 w-full gap-3 h-[50px]">
      {categories.map((category: string) => {
        const isSortButton = category === "Sort";
        return (
          <button
            key={category}
            className={`filter-button h-full px-4 py-2 text-white font-semibold rounded-lg transition-all whitespace-nowrap ${
              current === category ? "selected" : ""
            } ${isSortButton ? "sort" : ""}`}
            onClick={() => onClick(category)}
          >
            {isSortButton ? (
              <Image
                src="/arrow-drop-down.svg"
                alt="sort arrow"
                width={30}
                height={30}
              />
            ) : (
              category
            )}
          </button>
        );
      })}
    </div>
  );
};

export default FilterBar;
