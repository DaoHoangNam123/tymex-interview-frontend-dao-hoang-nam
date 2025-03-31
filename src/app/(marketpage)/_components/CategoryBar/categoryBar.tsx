"use client";

import React, { ChangeEvent, CSSProperties, useState, useCallback } from "react";
import { useMarketDispatch } from "@/store/hooks";
import { filterCategory, sortCategory } from "@/store/market/marketSlice";
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
import clsx from "clsx";
import "./styles/categoryBar.scss";

type CategoryBarProps = {
  categories?: string[];
};

type SortButtonProps = {
  order: typeof ORDER[keyof typeof ORDER];
  width: number;
  height: number;
  style: CSSProperties;
  ariaLabel: string;
};

const SortButton = ({ order, ariaLabel, ...rest }: SortButtonProps) => {
  return order === ORDER.ASC ? (
    <UpOutlined aria-label={ariaLabel} {...rest} />
  ) : (
    <DownOutlined aria-label={ariaLabel} {...rest} />
  );
};

const CategoryBar = ({ categories = CATERGORY_LIST }: CategoryBarProps) => {
  const [current, setCurrent] = useState("All");
  const [openFilter, setOpenFilter] = useState(false);
  const [orderCategory, setOrderCategory] = useState<typeof ORDER[keyof typeof ORDER]>(ORDER.ASC);
  const dispatch = useMarketDispatch();

  const showDrawerFilter = useCallback(() => {
    setOpenFilter(true);
  }, []);

  const onCloseFilter = useCallback(() => {
    setOpenFilter(false);
  }, []);

  const handleCategoryClick = useCallback((category: string) => {
    setCurrent(category);
    if (category === "Sort") {
      const newOrder = orderCategory === ORDER.ASC ? ORDER.DESC : ORDER.ASC;
      setOrderCategory(newOrder);
      dispatch(sortCategory(newOrder));
      return;
    }
    dispatch(filterCategory(category));
  }, [dispatch, orderCategory]);

  const handleSearchChange = useCallback(
    debounce((e: ChangeEvent<HTMLInputElement>) => {
      dispatch(filterCategory(e.target.value));
    }, DEBOUNCE_TIME),
    [dispatch]
  );

  return (
    <nav className="category-bar w-full flex items-center justify-center" role="navigation" aria-label="Category navigation">
      <div className="category-bar__container scrollbar-category h-full justify-end md:justify-start space-x-2 gap-2 pr-5 hidden md:flex">
        {categories.map((category) => {
          const isSortButton = category === "Sort";
          return (
            <button
              key={category}
              className={clsx(
                "filter-button h-[50px] px-4 py-2 text-white font-semibold rounded-lg whitespace-nowrap",
                {
                  "selected": current === category,
                  "sort": isSortButton
                }
              )}
              onClick={() => handleCategoryClick(category)}
              aria-pressed={current === category}
              aria-label={isSortButton ? `Sort ${orderCategory === ORDER.ASC ? 'descending' : 'ascending'}` : category}
            >
              {isSortButton ? (
                <SortButton
                  order={orderCategory}
                  width={50}
                  height={50}
                  style={{ color: "var(--color-primary)" }}
                  ariaLabel={`Sort ${orderCategory === ORDER.ASC ? 'descending' : 'ascending'}`}
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
          prefix={<SearchOutlined className="search-icon" aria-hidden="true" />}
          className="category-input"
          onChange={handleSearchChange}
          aria-label="Search categories"
        />
        <Button
          icon={<FilterFilled />}
          onClick={showDrawerFilter}
          className="search__drawer-button"
          aria-label="Open filter drawer"
        />
      </div>
      <Drawer
        onClose={onCloseFilter}
        open={openFilter}
        title=""
        className="search__drawer"
        placement="right"
      >
        <Sidebar />
      </Drawer>
    </nav>
  );
};

export default CategoryBar;
