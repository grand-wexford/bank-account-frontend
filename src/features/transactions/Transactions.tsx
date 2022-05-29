import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";

import { TransactionItem } from "./TransactionItem"
import { Filter } from "../filters/Filter"
import { Pagination } from "../pagination/Pagination";

import {
  selectTransactions,
  getTransactions,
  selectFiltersData
} from "./TransactionsSlice";

import {
  selectBreadcrumbs
} from "../breadcrumbs/BreadcrumbsSlice";

import styles from "./Transactions.module.css";

export function Transactions() {
  const transactions = useAppSelector(selectTransactions);
  const breadcrumbs = useAppSelector(selectBreadcrumbs);
  const filtersData = useAppSelector(selectFiltersData);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTransactions());
  }, [dispatch, breadcrumbs]);

  return (
    <div className={styles.container}>
      <Filter filtersData={filtersData} />
      <div className={styles.title}>Transactions</div>
      {transactions.list.length ? transactions.list.map(transaction => <TransactionItem key={transaction.transactionID} {...transaction} />) : "No data"}
      <Pagination type="transactions" />
    </div>
  );
}
