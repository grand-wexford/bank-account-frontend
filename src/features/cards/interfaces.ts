export interface ICard {
  cardID: string,
  cardAccount: string,
  maskedCardNumber: string,
  expireDate: string,
  currency: "USD" | "EUR" | "AZN",
  status: "active" | "blocked",
  balance: string
}

export interface ICardsState {
  list: ICard[];
  status: "idle" | "loading" | "failed";
  pages: number;
  selected: ICard | null
  filters: IFilters
}

export interface IFilterItem {
  title: string
  values: Array<string>
}

export interface IFilters {
  cardID: IFilterItem,
  cardAccount: IFilterItem,
  status: IFilterItem,
  currency: IFilterItem,
}