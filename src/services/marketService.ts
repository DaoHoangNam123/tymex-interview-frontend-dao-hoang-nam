import { AxiosResponse } from "axios";
import { CardProps, SearchProps } from "@/type/common";
import apiService from "./apiService";

//Need filter or sort by backend
const filterByPrice = (
  cardList: CardProps[],
  priceSort?: string,
  priceSlider?: number[]
) => {
  let newCardList = [...cardList];
  let sortPrice = priceSort === "Low" ? -1 : 1;

  if (priceSort) {
    newCardList = newCardList.sort((a, b) => sortPrice * (b.price - a.price));
  }

  if (priceSlider) {
    const [min, max] = priceSlider;
    newCardList = newCardList.filter((item) => item.price >= min);
    newCardList = newCardList.filter((item) => item.price <= max);
  }

  return newCardList;
};

// get all nft cards
export async function getNFTCards() {
  return apiService.fetchData({
    url: "/products",
    method: "get",
  });
}

// Search with multiple keyword
export async function getNFTCardsWithCriteria({ criteria }: SearchProps) {
  let url = `/products?`;
  const { input, tier, theme, sort, order, priceSort, priceSlider } = criteria;

  if (input) {
    url = url.concat(`q=${input}`);
  }

  if (tier && tier !== "All") {
    url = url.concat(`&tier_like=${tier}`);
  }

  if (theme) {
    url = url.concat(`&theme_like=${theme}`);
  }

  if (sort) {
    url = url.concat(`&_sort=${sort}`);
  }

  if (order) {
    url = url.concat(`&_order=${order}`);
  }

  const response = await apiService.fetchData({ url, method: "get" });

  const filteredCards = filterByPrice(
    (response as AxiosResponse).data as CardProps[],
    priceSort,
    priceSlider
  );

  return filteredCards;
}

export async function getNFTCardsWithSingleCriteria({ criteria }: SearchProps) {
  const { input, tier, theme, sort, order, priceSort, priceSlider } = criteria;
  let url = `/products?`;

  if (input) {
    url = url.concat(`q=${input}`);
  }

  if (tier && tier !== "All") {
    url = url.concat(`&tier_like=${tier}`);
    return apiService.fetchData({ url, method: "get" });
  }

  if (theme) {
    url = url.concat(`&theme_like=${theme}`);
    return apiService.fetchData({ url, method: "get" });
  }

  if (sort) {
    url = url.concat(`&_sort=${sort}`);

    if (order) {
      url = url.concat(`&_order=${order}`);
    }

    return apiService.fetchData({ url, method: "get" });
  }

  const response = await apiService.fetchData({ url, method: "get" });

  const filteredCards = filterByPrice(
    (response as AxiosResponse).data as CardProps[],
    priceSort,
    priceSlider
  );

  return filteredCards;
}
