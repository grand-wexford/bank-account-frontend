import React from "react";
import { useAppSelector } from "../../app/hooks";

import { IPagination } from "./interfaces"
import { ITransactionsState } from "../transactions/interfaces"
import { ICardsState } from "../cards/interfaces"
import { PaginationItem } from "./PaginationItem"

import {
  selectTransactions,
} from "../transactions/TransactionsSlice";

import {
  selectCards,
} from "../cards/CardsSlice";

import {
  selectBreadcrumbs,
} from "../breadcrumbs/BreadcrumbsSlice";

import styles from "./Pagination.module.css";

export function Pagination(props: IPagination) {
  const { type } = props;
  /**
   * @todo refactoring needed
   */
  const breadcrumbs = useAppSelector(selectBreadcrumbs);
  const transactions = useAppSelector(selectTransactions);
  const cards = useAppSelector(selectCards);

  const lastBreadcrumbState = breadcrumbs[breadcrumbs.length - 1];
  const currentPage = lastBreadcrumbState && lastBreadcrumbState.currentPage !== undefined ? lastBreadcrumbState.currentPage : 0;

  let items: ITransactionsState | ICardsState;
  if (type === "transactions") {
    items = transactions;
  } else {
    items = cards;
  }
  return (
    <div className={styles.row}>
      {[...Array(items.pages)].map((_, i) => <PaginationItem key={i} className={currentPage === i ? styles.active : ""} pageNumber={i} />)}
    </div>
  );
}
