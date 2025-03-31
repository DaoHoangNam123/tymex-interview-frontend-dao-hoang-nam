import { useMarketDispatch, useMarketSelector } from "@/store/hooks";
import {
  filterPrice,
  searchWithMultiCriteria,
  searchWithSingleCriteria,
  getCards,
  saveCriteria,
} from "@/store/market/marketSlice";
import { ChangeEvent, useCallback, useMemo } from "react";
import { FilterCriteriaProps, SearchProps } from "@/type/common";
import { debounce } from "lodash";
import { DEBOUNCE_TIME } from "@/src/constants/common";
import { getCriteria } from "@/src/store/market/marketSelector";

type FilterField = keyof FilterCriteriaProps;
type SortOrder = "asc" | "desc";

interface SortConfig {
  field: string;
  order: SortOrder;
}

const SORT_CONFIGS: Record<string, (value: string) => SortConfig> = {
  priceSort: (value: string) => ({
    field: "price",
    order: value === "Low" ? "asc" : "desc",
  }),
  time: (value: string) => ({
    field: "createAt",
    order: value === "Oldest" ? "asc" : "desc",
  }),
};

const useSidebarController = () => {
  const dispatch = useMarketDispatch();
  const criteria = useMarketSelector(getCriteria);

  // Memoize debounced handlers
  const debouncedSearch = useMemo(
    () =>
      debounce((searchCriteria: SearchProps) => {
        dispatch(searchWithMultiCriteria(searchCriteria));
      }, DEBOUNCE_TIME),
    [dispatch]
  );

  const debouncedSaveCriteria = useMemo(
    () =>
      debounce((newCriteria: FilterCriteriaProps) => {
        dispatch(saveCriteria(newCriteria));
      }, DEBOUNCE_TIME),
    [dispatch]
  );

  // Handle input change
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      const updatedCriteria = { ...criteria, input: value };
      debouncedSaveCriteria(updatedCriteria);
      debouncedSearch({ criteria: { input: value } });
    },
    [criteria, debouncedSaveCriteria, debouncedSearch]
  );

  // Handle search with multiple criteria
  const handleSearch = useCallback(
    (searchCriteria: SearchProps) => {
      dispatch(searchWithMultiCriteria(searchCriteria));
    },
    [dispatch]
  );

  // Handle sidebar field changes
  const handleChangeSidebar = useCallback(
    (value: string, field: FilterField) => {
      const updatedCriteria: FilterCriteriaProps = {
        ...criteria,
        [field]: value,
      };

      // Handle sort fields
      if (field in SORT_CONFIGS) {
        const { field: sortField, order } = SORT_CONFIGS[field](value);
        updatedCriteria.sort = sortField;
        updatedCriteria.order = order;
        dispatch(
          searchWithSingleCriteria({
            criteria: updatedCriteria,
            type: field,
          })
        );
        return;
      }

      // Handle filter fields
      if (field === "tier" || field === "theme") {
        dispatch(
          searchWithSingleCriteria({
            criteria: { ...criteria, [field]: value },
            type: field,
          })
        );
        return;
      }
    },
    [criteria, dispatch]
  );

  // Handle price slider changes
  const handleChangeSlider = useCallback(
    (value: number[]) => {
      dispatch(filterPrice(value));
    },
    [dispatch]
  );

  // Handle filter reset
  const handleResetFilter = useCallback(
    (defaultValue: FilterCriteriaProps) => {
      const updatedCriteria = { ...criteria, ...defaultValue };
      dispatch(saveCriteria(updatedCriteria));

      if (criteria?.input) {
        dispatch(
          searchWithMultiCriteria({ criteria: { input: criteria.input } })
        );
      } else {
        dispatch(getCards());
      }
    },
    [criteria, dispatch]
  );

  // Handle search button click
  const handleClickSearchButton = useCallback(
    (filterValue: FilterCriteriaProps) => {
      dispatch(saveCriteria({ criteria: filterValue }));
      dispatch(searchWithMultiCriteria({ criteria: filterValue }));
    },
    [dispatch]
  );

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
