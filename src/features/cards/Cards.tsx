import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";

import { CardItem } from "./CardItem";
import { Filter } from "../filters/Filter";
import { Pagination } from "../pagination/Pagination";

import {
  selectBreadcrumbs,
} from "../breadcrumbs/BreadcrumbsSlice";

import {
  selectFiltersData,
  selectCards,
  getCards,
} from "./CardsSlice";

import styles from "./Cards.module.css";

export function Cards() {
  const cards = useAppSelector(selectCards);
  const breadcrumbs = useAppSelector(selectBreadcrumbs);
  const filtersData = useAppSelector(selectFiltersData);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCards());
  }, [dispatch, breadcrumbs]);

  return (
    <div className={styles.container}>
      <Filter filtersData={filtersData} />
      <div className={styles.title}>Cards</div>
      {cards.list.length ? cards.list.map(card => <CardItem key={card.cardID} {...card} />) : "No data"}
      <Pagination type="cards" />
    </div>
  );
}
