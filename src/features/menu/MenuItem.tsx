import React from "react";
import { useNavigate } from "react-router-dom";
import { IMenuItem } from "./interfaces"

import styles from "./MenuItem.module.css";

export function MenuItem({ title, link }: IMenuItem) {
  const navigate = useNavigate();
  const handleClickMenuItem = () => navigate(link);

  return <div className={styles.menuItem} onClick={handleClickMenuItem}>{title}</div>;
}
