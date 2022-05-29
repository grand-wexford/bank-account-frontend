export interface IFilterItem {
  title: string
  values: Array<string>
}

export interface IFilters {
  cardID: IFilterItem,
  cardAccount: IFilterItem,
  amount?: IFilterItem,
  transactionDate?: IFilterItem,
  currency: IFilterItem,
}

export interface IFilterState {
  filtersData: IFilters
}