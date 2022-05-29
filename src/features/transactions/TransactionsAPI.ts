import { ITransaction } from "./interfaces";
import { API_URLS } from "../../constants";

export function fetchTransactions() {
  return new Promise<{ data: ITransaction[] }>((resolve) => {
    fetch(API_URLS.transactions)
      .then(res => res.json())
      .then(data => resolve({data:data}))
      .catch(error=>console.log(error))
  }
  );
}
