import React from "react";
import { ITransaction } from "./interfaces";
import { useNavigate, useLocation } from "react-router-dom";

import styles from "./TransactionItem.module.css";

export function TransactionItem(props: ITransaction) {
  const {
    transactionID,
    cardAccount,
    // cardID,
    amount,
    currency,
    transactionDate,
    merchantInfo,
  } = props;

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const handleClickRow = () => navigate(`${pathname}/${transactionID}`);

  return (
    <div className={styles.row} onClick={handleClickRow}>
      <div className={styles.date}>{transactionDate}</div>
      <div className={styles.merchantContainer}>
        <div className={styles.merchantInfo}>
          {merchantInfo}
        </div>
        <div className={styles.cardAccount}>
          {cardAccount}
        </div>
      </div>
      <div className={`${amount.includes("+") ? styles.amountPlus : styles.amountMinus}`}>{amount} {currency}</div>
    </div>
  );
}
