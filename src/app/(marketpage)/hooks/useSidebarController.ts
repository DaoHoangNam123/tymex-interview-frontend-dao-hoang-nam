import { useAppDispatch } from "@/store/hooks";
import {
  filterPrice,
  searchWithMultiCriteria,
  getCards,
  sortPrice,
} from "@/store/market/marketSlice";
import { ChangeEvent, useState } from "react";
import { FilterCriteriaProps, SearchProps } from "@/type/common";

const useSidebarController = (defaultValues: FilterCriteriaProps) => {
  const [searchCriteria, setSearchCriteria] = useState(defaultValues);

  const dispatch = useAppDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchCriteria((prev) => ({
      ...prev,
      input: value,
    }));
    dispatch(searchWithMultiCriteria({ criteria: { input: value } }));
  };

  const handleSearch = (searchCriteria: SearchProps) => {
    dispatch(searchWithMultiCriteria(searchCriteria));
  };

  const handleChangeSidebar = (e: string | number[], field: string) => {
    const updatedCriteria: FilterCriteriaProps = {
      ...searchCriteria,
      [field]: e,
    };

    if (field === "priceSlider") {
      dispatch(filterPrice(e));
    }

    if (field === "priceSort") {
      const sortType = e === "Low" ? -1 : 1;
      dispatch(sortPrice(sortType));
    }

    if (field === "tier" || field === "theme") {
      dispatch(
        searchWithMultiCriteria({
          criteria: { ...searchCriteria, [field]: e },
        })
      );
    }

    if (field === "time") {
      const sortType = e === "Oldest" ? -1 : 1;
      updatedCriteria.sort = "createAt";
      updatedCriteria.order = sortType > 0 ? "desc" : "asc";

      dispatch(
        searchWithMultiCriteria({
          criteria: updatedCriteria,
        })
      );
    }
    setSearchCriteria((prev) => ({
      ...prev,
      ...updatedCriteria,
    }));
  };

  const handleResetFilter = () => {
    setSearchCriteria({ ...defaultValues, input: searchCriteria?.input });
    if (searchCriteria?.input) {
      dispatch(
        searchWithMultiCriteria({ criteria: { input: searchCriteria?.input } })
      );
    } else {
      dispatch(getCards());
    }
  };

  const handleClickSearchButton = () => {
    dispatch(searchWithMultiCriteria({ criteria: searchCriteria }));
  };

  return {
    handleSearch,
    handleChange,
    handleChangeSidebar,
    handleResetFilter,
    handleClickSearchButton,
    searchCriteria,
  };
};
export default useSidebarController;
