"use client";

import React, { useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import { sortCategory } from "@/store/market/marketSlice";
import Image from "next/image";
import { CATERGORY_LIST } from "@/src/constants/common";
import { Button, Drawer } from "antd";
import {
  FilterFilled,
  MenuUnfoldOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import Sidebar from "../Sidebar/sidebar";
import "./categoryBar.scss";

interface FilterBarProps {
  categories?: string[];
}

const FilterBar = ({ categories = CATERGORY_LIST }: FilterBarProps) => {
  const [current, setCurrent] = useState("All");
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };
  const showDrawerFilter = () => {
    setOpenFilter(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  const onCloseFilter = () => {
    setOpenFilter(false);
  };

  const onClick = (e: string) => {
    setCurrent(e);
    dispatch(sortCategory(e));
  };

  return (
    <div className="category-bar">
      <div className="items-center space-x-2 overflow-x-auto w-full gap-3 h-[50px] hidden md:flex">
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
      <div className="flex justify-between items-center md:hidden">
        <Button
          icon={<FilterFilled />}
          onClick={showDrawerFilter}
          className="search__drawer-button"
        ></Button>
        <Drawer
          onClose={onCloseFilter}
          open={openFilter}
          title=""
          className="search__drawer"
        >
          <Sidebar isShowCategory />
        </Drawer>
      </div>
    </div>
  );
};

export default FilterBar;
