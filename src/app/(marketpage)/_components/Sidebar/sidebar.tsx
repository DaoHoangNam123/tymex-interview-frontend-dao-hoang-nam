"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Input, Slider, Select, Button, InputRef } from "antd";
import { CloseOutlined, SearchOutlined } from "@ant-design/icons";
import { debounce, omit } from "lodash";
import useSidebarController from "./hooks/useSidebarController";
import { useMarketSelector } from "@/src/store/hooks";
import { customDebounce } from "@/src/utils/common";
import "./sidebar.scss";

const Option = Select.Option;

const Sidebar = () => {
  const {
    handleChange,
    handleChangeSidebar,
    handleResetFilter,
    handleClickSearchButton,
    handleChangeSlider,
  } = useSidebarController();
  const inputRef = useRef<InputRef>(null);
  const criteria = useMarketSelector((state) => state.market.criteria);
  const [initValue, setInitValue] = useState({
    priceSlider: [0.01, 200],
    tier: "All",
    theme: "Halloween",
    time: "Latest",
    priceSort: "Low",
    sort: "createdAt",
    order: "asc",
  });

  const isDisableSearchButton = useMemo(() => {
    return Object.values(omit(criteria, "priceSlider")).every(
      (field) => !field
    );
  }, [criteria]);

  const debounceFilterPrice = useMemo(() => {
    const debounced = customDebounce(handleChangeSlider, 500);
    return debounced;
  }, [handleChangeSlider]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current?.select();
    }
  }, []);

  return (
    <div
      className={`sidebar w-[200px] lg:w-[250px] xl:w-[300px] 2xl:w-[372px] lg:pr-5 lg:block xl:pr-10`}
    >
      {/* Quick Search */}
      <Input
        placeholder="Quick search"
        prefix={<SearchOutlined className="search-icon" />}
        className="searchInput"
        onChange={(e) => {
          handleChange(e);
        }}
        ref={inputRef}
      />

      {/* Price Range Slider */}
      <div className="priceSection">
        <p className="filter-bar-title">PRICE</p>
        <Slider
          range
          value={initValue.priceSlider}
          min={0.01}
          max={200}
          className="slider"
          onChange={(e) => {
            setInitValue((prev) => ({ ...prev, priceSlider: e }));
            debounceFilterPrice(e);
          }}
        />
        <div className="priceLabels">
          <span>0.01 ETH</span>
          <span>200 ETH</span>
        </div>
      </div>

      {/* Dropdown Selections */}
      <div className="dropdownSection">
        <p className="filter-bar-title">TIER</p>
        <Select
          value={initValue.tier}
          className="select text-white"
          onChange={(e) => {
            setInitValue((prev) => ({ ...prev, tier: e }));
            debounce(() => handleChangeSidebar(e, "tier"), 500)();
          }}
        >
          <Option value="All">All</Option>
          <Option value="Basic">Basic</Option>
          <Option value="Premium">Premium</Option>
          <Option value="Deluxe">Deluxe</Option>
        </Select>

        <p className="filter-bar-title">THEME</p>
        <Select
          value={initValue.theme}
          className="select"
          onChange={(e) => {
            setInitValue((prev) => ({ ...prev, theme: e }));
            handleChangeSidebar(e, "theme");
          }}
        >
          <Option value="Halloween">Halloween</Option>
          <Option value="Light">Light</Option>
          <Option value="Colorful">Colorful</Option>
          <Option value="Dark">Dark</Option>
        </Select>

        <p className="filter-bar-title">TIME</p>
        <Select
          value={initValue.time}
          className="select"
          onChange={(e) => {
            setInitValue((prev) => ({ ...prev, time: e }));
            handleChangeSidebar(e, "time");
          }}
        >
          <Option value="Latest">Latest</Option>
          <Option value="Oldest">Oldest</Option>
        </Select>

        <p className="filter-bar-title">PRICE</p>
        <Select
          value={initValue.priceSort === "Low" ? "Low to high" : "High to low"}
          className="select"
          onChange={(e) => {
            setInitValue((prev) => ({ ...prev, priceSort: e }));
            handleChangeSidebar(e, "priceSort");
          }}
        >
          <Option value="Low">Low to high</Option>
          <Option value="High">High to low</Option>
        </Select>
      </div>

      {/* Buttons */}
      <div className="buttons">
        <div className="flex justify-between items-center gap-2">
          <Button
            className="resetButton"
            shape="round"
            icon={<CloseOutlined className="w-4 h-4" />}
            onClick={() => {
              const defaultValue = {
                priceSlider: [0.01, 200],
                tier: "All",
                theme: "Halloween",
                time: "Latest",
                priceSort: "Low",
                sort: "",
                order: "",
              };
              setInitValue(defaultValue);
              handleResetFilter(defaultValue);
            }}
          ></Button>
          <span className="text-base hidden lg:block">Reset Filter</span>
        </div>
        <Button
          type="primary"
          className="searchButton"
          onClick={() => handleClickSearchButton(initValue)}
          disabled={isDisableSearchButton}
        >
          Search
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
