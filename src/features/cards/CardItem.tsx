import React from "react";
import { ICard } from "./interfaces";
import { useNavigate, useLocation } from "react-router-dom";

import styles from "./CardItem.module.css";

export function CardItem(props: ICard) {
  const {
    cardID,
    // cardAccount,
    maskedCardNumber,
    expireDate,
    currency,
    status,
    balance,
  } = props;

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleClickRow = (cardID: string) => navigate(`${pathname}/${cardID}`);

  return (
    <div className={styles.row} onClick={() => handleClickRow(cardID)}>
      {status === "blocked" ? <div className={styles.statusBlocked}>{status}</div> : null}
      <div className={styles.maskedCardNumberContainer}>
        <div className={styles.maskedCardNumber}>
          {maskedCardNumber}
        </div>
        <div className={styles.expireDate}>
          Expire Date: {expireDate}
        </div>
      </div>
      <div className={styles.balance}>{balance} {currency}</div>
    </div>
  );
}
