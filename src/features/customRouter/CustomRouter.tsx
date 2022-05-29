import React from "react";
import { useLocation } from "react-router-dom";

import { Transactions } from "../transactions/Transactions";
import { TransactionDetail } from "../transactions/TransactionDetail";
import { CardDetail } from "../cards/CardDetail";
import { Cards } from "../cards/Cards";

export function CustomRouter() {
  const { pathname } = useLocation();
  let Component = <h1>404</h1>;

  const pathnameArr = pathname.split("/").reverse();
  const catIndex = pathnameArr.findIndex(c => c === "Transactions" || c === "Cards");
  pathnameArr.splice(catIndex + 1);
  pathnameArr.reverse();

  if (pathnameArr[0] === "Transactions") {
    if (pathnameArr.length === 3) {
      Component = <CardDetail />;
    } else if (pathnameArr.length === 2) {
      Component = <TransactionDetail />;
    } else {
      Component = <Transactions />;
    }
  }

  if (pathnameArr[0] === "Cards") {
    if (pathnameArr.length === 2) {
      Component = <CardDetail />;
    } else {
      Component = <Cards />;
    }
  }

  return Component;
}
