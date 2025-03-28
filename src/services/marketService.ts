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
  const sortPrice = priceSort === "Low" ? -1 : 1;

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
  const { input, tier, theme, sort, order, priceSort, priceSlider, category } =
    criteria;

  if (input) {
    url = url.concat(`q=${input}`);
  }

  if (tier && tier !== "All") {
    url = url.concat(`&tier_like=${tier}`);
  }

  if (theme) {
    url = url.concat(`&theme_like=${theme}`);
  }

  if (category) {
    url = url.concat(`&category_like=${category}`);
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

export async function getNFTCardsWithSingleCriteria(
  params: SearchProps & {
    type: string;
  }
) {
  const criteria = params?.criteria;
  const type = params?.type;
  const { input, tier, theme, sort, order } = criteria;
  let url = `/products?`;

  if (input) {
    url = url.concat(`q=${input}`);
  }

  switch (type) {
    case "tier": {
      url = url.concat(`&tier_like=${tier}`);
      break;
    }
    case "theme": {
      url = url.concat(`&theme_like=${theme}`);
      break;
    }
    case "priceSort":
    case "time": {
      url = url.concat(`&_sort=${sort}`);

      if (order) {
        url = url.concat(`&_order=${order}`);
      }
      break;
    }
  }

  return apiService.fetchData({ url, method: "get" });
}
