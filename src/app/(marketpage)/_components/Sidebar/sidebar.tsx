"use client";

import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
} from "react";
import { Input, Slider, Select, Button, InputRef } from "antd";
import { CloseOutlined, SearchOutlined } from "@ant-design/icons";
import { debounce, omit } from "lodash";
import useSidebarController from "./hooks/useSidebarController";
import { useMarketSelector } from "@/src/store/hooks";
import { customDebounce } from "@/src/utils/common";
import clsx from "clsx";
import "./styles/sidebar.scss";

const { Option } = Select;

interface FilterValue {
  priceSlider: [number, number];
  tier: string;
  theme: string;
  time: string;
  priceSort: string;
  sort: string;
  order: string;
}

const DEFAULT_FILTER_VALUE: FilterValue = {
  priceSlider: [0.01, 200],
  tier: "All",
  theme: "Halloween",
  time: "Latest",
  priceSort: "Low",
  sort: "",
  order: "",
};

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
  const [initValue, setInitValue] = useState<FilterValue>(DEFAULT_FILTER_VALUE);

  const isDisableSearchButton = useMemo(() => {
    return Object.values(omit(criteria, "priceSlider")).every(
      (field) => !field
    );
  }, [criteria]);

  const debounceFilterPrice = useMemo(() => {
    return customDebounce(handleChangeSlider, 500);
  }, [handleChangeSlider]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current?.select();
    }
  }, []);

  const handlePriceChange = useCallback(
    (value: [number, number]) => {
      setInitValue((prev) => ({ ...prev, priceSlider: value }));
      debounceFilterPrice(value);
    },
    [debounceFilterPrice]
  );

  const handleSelectChange = useCallback(
    (value: string, field: keyof FilterValue) => {
      setInitValue((prev) => ({ ...prev, [field]: value }));
      if (field === "tier") {
        debounce(() => handleChangeSidebar(value, field), 500)();
      } else {
        handleChangeSidebar(value, field);
      }
    },
    [handleChangeSidebar]
  );

  const handleReset = useCallback(() => {
    setInitValue(DEFAULT_FILTER_VALUE);
    handleResetFilter(DEFAULT_FILTER_VALUE);
  }, [handleResetFilter]);

  return (
    <aside
      className={clsx(
        "sidebar w-[200px] lg:w-[250px] xl:w-[300px] 2xl:w-[372px] lg:pr-5 lg:block xl:pr-10"
      )}
      role="complementary"
      aria-label="Filter sidebar"
    >
      {/* Quick Search */}
      <Input
        placeholder="Quick search"
        prefix={<SearchOutlined className="search-icon" aria-hidden="true" />}
        className="searchInput"
        onChange={handleChange}
        ref={inputRef}
        aria-label="Search NFTs"
      />

      {/* Price Range Slider */}
      <section className="priceSection" aria-label="Price range filter">
        <h3 className="filter-bar-title">PRICE</h3>
        <Slider
          range
          value={initValue.priceSlider}
          min={0.01}
          max={200}
          className="slider"
          onChange={handlePriceChange}
          aria-label="Price range slider"
        />
        <div className="priceLabels">
          <span>0.01 ETH</span>
          <span>200 ETH</span>
        </div>
      </section>

      {/* Dropdown Selections */}
      <section className="dropdownSection" aria-label="Filter options">
        <h3 className="filter-bar-title">TIER</h3>
        <Select
          value={initValue.tier}
          className="select text-white"
          onChange={(value) => handleSelectChange(value, "tier")}
          aria-label="Select tier"
        >
          <Option value="All">All</Option>
          <Option value="Basic">Basic</Option>
          <Option value="Premium">Premium</Option>
          <Option value="Deluxe">Deluxe</Option>
        </Select>

        <h3 className="filter-bar-title">THEME</h3>
        <Select
          value={initValue.theme}
          className="select"
          onChange={(value) => handleSelectChange(value, "theme")}
          aria-label="Select theme"
        >
          <Option value="Halloween">Halloween</Option>
          <Option value="Light">Light</Option>
          <Option value="Colorful">Colorful</Option>
          <Option value="Dark">Dark</Option>
        </Select>

        <h3 className="filter-bar-title">TIME</h3>
        <Select
          value={initValue.time}
          className="select"
          onChange={(value) => handleSelectChange(value, "time")}
          aria-label="Select time"
        >
          <Option value="Latest">Latest</Option>
          <Option value="Oldest">Oldest</Option>
        </Select>

        <h3 className="filter-bar-title">PRICE</h3>
        <Select
          value={initValue.priceSort === "Low" ? "Low to high" : "High to low"}
          className="select"
          onChange={(value) => handleSelectChange(value, "priceSort")}
          aria-label="Select price sort order"
        >
          <Option value="Low">Low to high</Option>
          <Option value="High">High to low</Option>
        </Select>
      </section>

      {/* Buttons */}
      <section className="buttons" aria-label="Filter actions">
        <div className="flex justify-between items-center gap-2">
          <Button
            className="resetButton"
            shape="round"
            icon={<CloseOutlined className="w-4 h-4" />}
            onClick={handleReset}
            aria-label="Reset all filters"
          />
          <span className="text-base hidden lg:block">Reset Filter</span>
        </div>
        <Button
          type="primary"
          className="searchButton"
          onClick={() => handleClickSearchButton(initValue)}
          disabled={isDisableSearchButton}
          aria-label="Apply filters"
        >
          Search
        </Button>
      </section>
    </aside>
  );
};

export default React.memo(Sidebar);
