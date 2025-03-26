export type AuthorProps = {
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  avatar: string;
  onlineStatus: string;
};

export type CardProps = {
  id: number;
  category: string;
  title: string;
  price: number;
  author: AuthorProps;
  isFavorite: boolean;
  createdAt: number;
  theme: string;
  tier: string;
  imageId: number;
};

export type NFTCardProps = {
  card: CardProps;
  imageList: string[];
};

export type GetCardsResponse = {
  data: any[];
};

export type FilterCriteriaProps = {
  priceSlider?: number[];
  tier?: string;
  theme?: string;
  time?: string;
  priceSort?: string;
  input?: string;
  sort?: string;
  order?: string;
};

export type SearchProps = {
  criteria: FilterCriteriaProps;
};

export interface HandleChangeSidebarEvent {
  target: {
    value: any;
  };
}
