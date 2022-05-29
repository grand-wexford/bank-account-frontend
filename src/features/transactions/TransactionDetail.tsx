import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../app/hooks";

import {
  getTransactionById,
  selectTransactions,
} from "./TransactionsSlice";

import styles from "./TransactionDetail.module.css";

export function TransactionDetail() {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const transactions: any = useAppSelector(selectTransactions);
  let selected = transactions?.selected || {};
  const idFromParams = pathname.split("/").pop();

  const {
    transactionID,
    cardAccount,
    cardID,
    amount,
    currency,
    transactionDate,
    merchantInfo,
  } = selected;

  const handleClickCardId = () => navigate(`${pathname}/${cardID}`);

  useEffect(() => {
    dispatch(getTransactionById(idFromParams || ""));
  }, [dispatch, idFromParams]);

  return (
    <div className={styles.details}>
      <div>Transaction details</div>
      <div className={styles.row}>
        <div>Transaction ID</div><div>{transactionID}</div>
      </div>
      <div className={styles.row}>
        <div>Card Account</div><div>{cardAccount}</div>
      </div>
      <div className={styles.row}>
        <div className={styles.link} onClick={handleClickCardId}>Card ID</div><div>{cardID}</div>
      </div>
      <div className={styles.row}>
        <div>Amount</div><div>{amount}</div>
      </div>
      <div className={styles.row}>
        <div>Currency</div><div>{currency}</div>
      </div>
      <div className={styles.row}>
        <div>Transaction Date</div><div>{transactionDate}</div>
      </div>
      <div className={styles.row}>
        <div>Merchant Info</div><div>{merchantInfo}</div>
      </div>
    </div>
  );
}
