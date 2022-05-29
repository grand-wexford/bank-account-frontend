import React, { BaseSyntheticEvent } from "react";

import { useAppDispatch } from "../../app/hooks";
import { IPaginationItem } from "./interfaces"
import {
  setCurrentPage
} from "../breadcrumbs/BreadcrumbsSlice";

export function PaginationItem({ pageNumber, className }: IPaginationItem) {
  const dispatch = useAppDispatch();
  const handleClick = (event: BaseSyntheticEvent) => dispatch(setCurrentPage(Number(event.target.innerText) - 1));

  return <div className={className} onClick={handleClick}>{pageNumber + 1}</div>;
}
