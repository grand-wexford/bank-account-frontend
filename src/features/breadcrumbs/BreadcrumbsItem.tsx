import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IBreadcrumbsStateItem } from "./interfaces"

import styles from './Breadcrumbs.module.css';

export function BreadcrumbsItem(breadcrumb: IBreadcrumbsStateItem) {
  let navigate = useNavigate();

  const handleClick = () => {
    breadcrumb.link && navigate(breadcrumb.link);
  }

  return (
    <div onClick={handleClick} className={`${!breadcrumb.link ? styles.nolink : ""}`}>{breadcrumb.name}</div>
  );
}
