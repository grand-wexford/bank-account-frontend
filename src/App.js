import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { Menu } from "./features/menu/Menu";
import { Breadcrumbs } from "./features/breadcrumbs/Breadcrumbs";
import { Transactions } from "./features/transactions/Transactions";
import { TransactionDetail } from "./features/transactions/TransactionDetail";
import { CardDetail } from "./features/cards/CardDetail";
import { Cards } from "./features/cards/Cards";
import { CustomRouter } from "./features/customRouter/CustomRouter";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Menu />
      <div className="App-content">
        <Breadcrumbs />
        <Routes>
          <Route index element={<Navigate to="/Transactions" />} />
          <Route path="/Transactions" element={<Transactions />} />
          <Route path="/Transactions/:transactionID" element={<TransactionDetail />} />
          <Route path="/Transactions/:transactionID/:cardID" element={<CardDetail />} />

          <Route path="/Cards" element={<Cards />} />
          <Route path="/Cards/:cardID" element={<CardDetail />} />
          <Route path="/Cards/:cardID/Transactions" element={<Transactions />} />
          <Route path="/Cards/:cardID/Transactions/:transactionID" element={<TransactionDetail />} />

          <Route path="*" element={<CustomRouter />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
