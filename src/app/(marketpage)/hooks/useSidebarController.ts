import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  filterPrice,
  searchWithMultiCriteria,
  searchWithSingleCriteria,
  getCards,
  saveCriteria,
} from "@/store/market/marketSlice";
import { ChangeEvent } from "react";
import { FilterCriteriaProps, SearchProps } from "@/type/common";
import { debounce } from "lodash";

const useSidebarController = () => {
  const dispatch = useAppDispatch();
  const criteria = useAppSelector((state) => state.market.criteria);

  const handleChange = debounce((e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(saveCriteria({ ...criteria, input: value }));
    dispatch(searchWithMultiCriteria({ criteria: { input: value } }));
  }, 500);

  const handleChangeCategory = debounce((e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(searchWithMultiCriteria({ criteria: { category: value } }));
  }, 500);

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
          criteria: { ...criteria, [field]: e },
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
  }, 500);

  const handleChangeSlider = (e: number[]) => {
    dispatch(filterPrice(e));
  };

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
    handleChangeCategory,
  };
};
export default useSidebarController;
