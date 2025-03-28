"use client";

import React, { ChangeEvent, CSSProperties, useState } from "react";
import { useMarketDispatch } from "@/store/hooks";
import { filterCategory, sortCategory } from "@/store/market/marketSlice";
import Image from "next/image";
import { CATERGORY_LIST, DEBOUNCE_TIME, ORDER } from "@/src/constants/common";
import { Button, Drawer, Input } from "antd";
import {
  DownOutlined,
  FilterFilled,
  SearchOutlined,
  UpOutlined,
} from "@ant-design/icons";
import Sidebar from "../Sidebar/sidebar";
import { debounce } from "lodash";
import "./categoryBar.scss";

type CategoryBarProps = {
  categories?: string[];
};

type SortButtonProps = {
  order: string;
  width: number;
  height: number;
  style: CSSProperties;
};
const SortButton = ({ order, ...rest }: SortButtonProps) => {
  return order === ORDER.ASC ? (
    <UpOutlined {...rest} />
  ) : (
    <DownOutlined {...rest} />
  );
};
const CategoryBar = ({ categories = CATERGORY_LIST }: CategoryBarProps) => {
  const [current, setCurrent] = useState("All");
  const [openFilter, setOpenFilter] = useState(false);
  const [orderCategory, setOrderCategory] = useState("asc");
  const dispatch = useMarketDispatch();

  const showDrawerFilter = () => {
    setOpenFilter(true);
  };

  const onCloseFilter = () => {
    setOpenFilter(false);
  };

  const onClick = (e: string) => {
    setCurrent(e);
    if (e === "Sort") {
      const order = orderCategory === ORDER.ASC ? "desc" : "asc";
      setOrderCategory(order);
      dispatch(sortCategory(order));
      return;
    }
    dispatch(filterCategory(e));
  };

  const handleChangeCategory = debounce((e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(filterCategory(value));
  }, DEBOUNCE_TIME);

  return (
    <div className="category-bar w-full flex items-center justify-end md:justify-start">
      <div className="w-full overflow-x-auto items-center justify-start space-x-2 gap-2 h-[50px] pr-5 hidden md:flex">
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
                <SortButton
                  order={orderCategory}
                  width={50}
                  height={50}
                  style={{ color: "rgba(218, 69, 143, 1)" }}
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
