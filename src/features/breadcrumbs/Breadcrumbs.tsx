import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { BreadcrumbsItem } from "./BreadcrumbsItem";

import {
  pushBreadcrumb,
  selectBreadcrumbs,
  sliceBreadcrumb,
  setFilters,
} from "./BreadcrumbsSlice";

import styles from "./Breadcrumbs.module.css";

export function Breadcrumbs() {
  const breadcrumbs = useAppSelector(selectBreadcrumbs);
  const dispatch = useAppDispatch();
  const location = useLocation();

  const isNumber = (n: any) => !isNaN(parseFloat(n)) && !isNaN(n - 0);

  useEffect(() => {
    let pathArr = location.pathname.split("/");

    if (pathArr[pathArr.length - 1] === "") {
      pathArr.pop();
    }

    if (pathArr.length > breadcrumbs.length) {
      let link = pathArr.slice(0, breadcrumbs.length).join("/");

      for (let i = breadcrumbs.length; i < pathArr.length; i++) {
        link += `/${pathArr[i]}`
        dispatch(pushBreadcrumb({
          link: link,
          name: `${pathArr[i]}`,
        }));
      }

      // add filter if transactions for card
      if (pathArr[pathArr.length - 1] && pathArr[pathArr.length - 3]) {
        if (pathArr[pathArr.length - 1] === "Transactions" && isNumber(pathArr[pathArr.length - 2])) {
          dispatch(setFilters({ cardID: pathArr[pathArr.length - 2] }));
        }
      }

    } else if (pathArr.length < breadcrumbs.length) {
      if (pathArr[1] !== breadcrumbs[1].name) {
        dispatch(sliceBreadcrumb(breadcrumbs.length - pathArr.length + 1));
        dispatch(pushBreadcrumb({
          link: pathArr[1],
          name: pathArr[1],
        }));
      } else {
        dispatch(sliceBreadcrumb(breadcrumbs.length - pathArr.length));
      }
    } else {
      if (pathArr.length !== 1) {
        dispatch(sliceBreadcrumb(1));
      }
      dispatch(pushBreadcrumb({
        link: location.pathname,
        name: pathArr[pathArr.length - 1],
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, location]);

  return (
    <div className={styles.row}>
      {breadcrumbs.map((b, i) => <BreadcrumbsItem key={i} {...b} />)}
    </div>
  );
}
