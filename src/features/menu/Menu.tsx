import React from "react";

import { MENU } from "../../constants";
import { MenuItem } from "./MenuItem"

import styles from "./Menu.module.css";

export function Menu() {
  return (
    <div className={styles.menu}>
      {MENU.map(item => <MenuItem key={item.title} {...item} />)}
    </div>
  );
}
