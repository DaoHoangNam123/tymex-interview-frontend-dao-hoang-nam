import { useMarketDispatch, useMarketSelector } from "@/store/hooks";
import {
  filterPrice,
  searchWithMultiCriteria,
  searchWithSingleCriteria,
  getCards,
  saveCriteria,
} from "@/store/market/marketSlice";
import { ChangeEvent, useCallback } from "react";
import { FilterCriteriaProps, SearchProps } from "@/type/common";
import { debounce } from "lodash";
import { DEBOUNCE_TIME } from "@/src/constants/common";
import { getCriteria } from "@/src/store/market/marketSelector";

const useSidebarController = () => {
  const dispatch = useMarketDispatch();
  const criteria = useMarketSelector(getCriteria);

  const handleChange = debounce((e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(saveCriteria({ ...criteria, input: value }));
    dispatch(searchWithMultiCriteria({ criteria: { input: value } }));
  }, DEBOUNCE_TIME);

  const handleSearch = (searchCriteria: SearchProps) => {
    dispatch(searchWithMultiCriteria(searchCriteria));
  };

  const handleChangeSidebar = debounce((e: string, field: string) => {
    const updatedCriteria: FilterCriteriaProps = {
      ...criteria,
      [field]: e,
    };

    if (field === "priceSort") {
      const sortType = e === "Low" ? -1 : 1;
      updatedCriteria.sort = "price";
      updatedCriteria.order = sortType > 0 ? "desc" : "asc";
      dispatch(
        searchWithSingleCriteria({
          criteria: { ...updatedCriteria },
          type: field,
        })
      );
    }

    if (field === "tier" || field === "theme") {
      dispatch(
        searchWithSingleCriteria({
          criteria: { ...criteria, [field]: e },
          type: field,
        })
      );
    }

    if (field === "time") {
      const sortType = e === "Oldest" ? -1 : 1;
      updatedCriteria.sort = "createAt";
      updatedCriteria.order = sortType > 0 ? "desc" : "asc";

      dispatch(
        searchWithSingleCriteria({
          criteria: updatedCriteria,
          type: "time",
        })
      );
    }
  }, DEBOUNCE_TIME);

  const handleChangeSlider = useCallback(
    (e: number[]) => {
      dispatch(filterPrice(e));
    },
    [dispatch]
  );

  const handleResetFilter = (defaultValue: FilterCriteriaProps) => {
    dispatch(saveCriteria({ ...criteria, ...defaultValue }));
    if (criteria?.input) {
      dispatch(
        searchWithMultiCriteria({ criteria: { input: criteria?.input } })
      );
    } else {
      dispatch(getCards());
    }
  };

  const handleClickSearchButton = (filterValue: FilterCriteriaProps) => {
    dispatch(saveCriteria({ criteria: filterValue }));
    dispatch(searchWithMultiCriteria({ criteria: filterValue }));
  };

  return {
    handleSearch,
    handleChange,
    handleChangeSidebar,
    handleResetFilter,
    handleClickSearchButton,
    handleChangeSlider,
  };
};
export default useSidebarController;
