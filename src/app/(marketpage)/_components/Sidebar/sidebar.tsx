"use client";

import React, { useEffect, useMemo, useRef } from "react";
import { Input, Slider, Select, Button, InputRef } from "antd";
import { CloseOutlined, SearchOutlined } from "@ant-design/icons";
import { debounce, omit } from "lodash";
import useSidebarController from "../../hooks/useSidebarController";
import "./sidebar.scss";

const { Option } = Select;

const defaultFilterValue = {
  priceSlider: [0.01, 200],
  tier: "All",
  theme: "Halloween",
  time: "Latest",
  priceSort: "Low",
  input: "",
};

const Sidebar = () => {
  const {
    handleChange,
    handleChangeSidebar,
    handleResetFilter,
    handleClickSearchButton,
    searchCriteria,
  } = useSidebarController(defaultFilterValue);
  const inputRef = useRef<InputRef>(null);
  const isDisableSearchButton = useMemo(() => {
    return Object.values(omit(searchCriteria, "priceSlider")).every(
      (field) => !field
    );
  }, [searchCriteria]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current?.select();
    }
  }, []);

  return (
    <div className="sidebar">
      {/* Quick Search */}
      <Input
        placeholder="Quick search"
        prefix={
          <SearchOutlined className="search-icon" placeholder="Quick search" />
        }
        className="searchInput"
        onChange={debounce((e) => handleChange(e), 500)}
        ref={inputRef}
      />

      {/* Price Range Slider */}
      <div className="priceSection">
        <p className="filter-bar-title">PRICE</p>
        <Slider
          range
          defaultValue={defaultFilterValue.priceSlider}
          min={0.01}
          max={200}
          className="slider"
          onChange={debounce((e) => handleChangeSidebar(e, "priceSlider"), 500)}
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
          defaultValue={defaultFilterValue.tier}
          className="select text-white"
          onChange={debounce((e) => handleChangeSidebar(e, "tier"), 500)}
        >
          <Option value="All">All</Option>
          <Option value="Basic">Basic</Option>
          <Option value="Premium">Premium</Option>
          <Option value="Deluxe">Deluxe</Option>
        </Select>

        <p className="filter-bar-title">THEME</p>
        <Select
          defaultValue={defaultFilterValue.theme}
          className="select"
          onChange={debounce((e) => handleChangeSidebar(e, "theme"), 500)}
        >
          <Option value="Halloween">Halloween</Option>
          <Option value="Light">Light</Option>
          <Option value="Colorful">Colorful</Option>
          <Option value="Dark">Dark</Option>
        </Select>

        <p className="filter-bar-title">TIME</p>
        <Select
          defaultValue={defaultFilterValue.time}
          className="select"
          onChange={debounce((e) => handleChangeSidebar(e, "time"), 500)}
        >
          <Option value="Latest">Latest</Option>
          <Option value="Oldest">Oldest</Option>
        </Select>

        <p className="filter-bar-title">PRICE</p>
        <Select
          defaultValue={
            defaultFilterValue.priceSort === "Low"
              ? "Low to high"
              : "High to low"
          }
          className="select"
          onChange={debounce((e) => handleChangeSidebar(e, "priceSort"), 500)}
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
            onClick={handleResetFilter}
          ></Button>
          <span className="text-base">Reset Filter</span>
        </div>
        <Button
          type="primary"
          className="searchButton"
          onClick={handleClickSearchButton}
          disabled={isDisableSearchButton}
        >
          Search
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
