import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../app/hooks";

import {
  getCardById,
  selectCards,
} from "./CardsSlice";

import styles from "./CardDetail.module.css";

export function CardDetail() {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const cards: any = useAppSelector(selectCards);
  let selected = cards?.selected || {};
  const idFromParams = pathname.split("/").pop();
  const {
    cardID,
    cardAccount,
    maskedCardNumber,
    expireDate,
    currency,
    status,
    balance,
  } = selected;


  const handleClickTransactions = () => navigate(`${pathname}/Transactions`);

  useEffect(() => {
    dispatch(getCardById(idFromParams || ""));
  }, [dispatch, idFromParams]);

  return (
    <div className={styles.details}>
      <div>Card details</div>
      <div className={styles.row}>
        <div>Card ID</div><div>{cardID}</div>
      </div>
      <div className={styles.row}>
        <div>Card Account</div><div>{cardAccount}</div>
      </div>
      <div className={styles.row}>
        <div>Masked Card Number</div><div>{maskedCardNumber}</div>
      </div>
      <div className={styles.row}>
        <div>Expire Date</div><div>{expireDate}</div>
      </div>
      <div className={styles.row}>
        <div>Currency</div><div>{currency}</div>
      </div>
      <div className={styles.row}>
        <div>Status</div><div>{status}</div>
      </div>
      <div className={styles.row}>
        <div>Balance</div><div>{balance}</div>
      </div>
      <div className={styles.row}>
        <div className={styles.link} onClick={handleClickTransactions}>Transactions</div><div></div>
      </div>
    </div>
  );
}
