export interface ITransaction {
  transactionID: string
  cardAccount: string
  cardID: string
  amount: string
  currency: "USD" | "EUR" | "AZN"
  transactionDate: string
  merchantInfo: string
}

export interface ITransactionsState {
  list: ITransaction[]
  status: "idle" | "loading" | "failed"
  pages: number
  selected: ITransaction | null
  filters: IFilters
}

export interface IFilterItem {
  title: string
  values: Array<string>
}

export interface IFilters {
  cardID: IFilterItem,
  cardAccount: IFilterItem,
  amount: IFilterItem,
  transactionDate:IFilterItem,
  currency: IFilterItem,
}