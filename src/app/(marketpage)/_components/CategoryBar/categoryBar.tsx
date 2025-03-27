"use client";

import React, { ChangeEvent, useState } from "react";
import { useMarketDispatch } from "@/store/hooks";
import { sortCategory } from "@/store/market/marketSlice";
import Image from "next/image";
import { CATERGORY_LIST } from "@/src/constants/common";
import { Button, Drawer, Input } from "antd";
import { FilterFilled, SearchOutlined } from "@ant-design/icons";
import Sidebar from "../Sidebar/sidebar";
import { debounce } from "lodash";
import "./categoryBar.scss";

interface CategoryBarProps {
  categories?: string[];
}

const CategoryBar = ({ categories = CATERGORY_LIST }: CategoryBarProps) => {
  const [current, setCurrent] = useState("All");
  const dispatch = useMarketDispatch();
  const [openFilter, setOpenFilter] = useState(false);

  const showDrawerFilter = () => {
    setOpenFilter(true);
  };

  const onCloseFilter = () => {
    setOpenFilter(false);
  };

  const onClick = (e: string) => {
    setCurrent(e);
    dispatch(sortCategory(e));
  };
  const handleChangeCategory = debounce((e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(sortCategory(value));
  }, 500);

  return (
    <div className="category-bar w-full flex items-center justify-end md:justify-start">
      <div className="w-full overflow-x-auto items-center justify-start space-x-2 gap-2 h-[50px] hidden md:flex">
        {categories.map((category: string) => {
          const isSortButton = category === "Sort";
          return (
            <button
              key={category}
              className={`filter-button h-full px-4 py-2 text-white font-semibold rounded-lg whitespace-nowrap ${
                current === category ? "selected" : ""
              } ${isSortButton ? "sort" : ""}`}
              onClick={() => onClick(category)}
            >
              {isSortButton ? (
                <Image
                  src="/arrow-drop-down.svg"
                  alt="sort arrow"
                  width={50}
                  height={50}
                />
              ) : (
                category
              )}
            </button>
          );
        })}
      </div>
      <div className="flex justify-between items-center gap-5 md:hidden">
        <Input
          placeholder="Category search"
          prefix={
            <SearchOutlined
              className="search-icon"
              placeholder="Quick search"
            />
          }
          className="category-input"
          onChange={handleChangeCategory}
        />
        <Button
          icon={<FilterFilled />}
          onClick={showDrawerFilter}
          className="search__drawer-button"
        ></Button>
      </div>
      <Drawer
        onClose={onCloseFilter}
        open={openFilter}
        title=""
        className="search__drawer"
      >
        <Sidebar />
      </Drawer>
    </div>
  );
};

export default CategoryBar;
