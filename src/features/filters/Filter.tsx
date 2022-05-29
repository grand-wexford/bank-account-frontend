import React, { BaseSyntheticEvent, useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { IFilters, IFilterState } from "./interfaces";

import {
  setFilters,
  selectFilters,
} from "../breadcrumbs/BreadcrumbsSlice";

import styles from "./Filter.module.css";

export function Filter(props: IFilterState) {
  const { filtersData } = props;
  const defaultFilters: any = Object.keys(filtersData).reduce((a, v) => ({ ...a, [v]: "" }), {});

  const savedFilters: any = useAppSelector(selectFilters);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  let [filters, setFiltersState] = useState<typeof defaultFilters>(defaultFilters);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setFiltersState({ ...defaultFilters, ...savedFilters });
  }, [savedFilters]);

  const handleClickShow = () => !showFilters && setShowFilters(true);
  const handleClickClose = () => setShowFilters(false);
  const handleClickApply = () => dispatch(setFilters(filters));
  const handleClickReset = () => dispatch(setFilters({}));

  const handleChangeFilter = (event: BaseSyntheticEvent) => {
    setFiltersState({
      ...filters,
      [event.target.id]: event.target.value
    });
  }

  function hasSavedFilters(): boolean {
    let result = false;

    Object.keys(filters).forEach(key => {
      if (filters[key as keyof IFilters]) {
        result = true;
      }
    });
    return result;
  }

  function filterFilds(): any[] {
    let fields: any = [];

    Object.keys(filtersData).forEach(key => {
      let field = filtersData[key as keyof IFilters];

      fields.push({
        key,
        ...field,
      });
    });
    return fields;
  }

  return (
    <div className={`${showFilters ? styles.container : styles.containerHidden}`} onClick={handleClickShow}>
      <div className={`${styles.title} ${hasSavedFilters() ? styles.hasFilters : ""}`}>Filters</div>
      {filterFilds().map((item, i) =>
        <div key={i} className={styles.row}>
          <div>{item.title}</div>
          <div>
            <select
              id={item.key}
              onChange={handleChangeFilter}
              value={filters[item.key as keyof IFilters]}
            >
              {item.values.map((item2: React.Key) => <option key={item2}>{item2}</option>)}
            </select>
          </div>
        </div>)}
      <div className={styles.buttons}>
        <div>
          <button onClick={handleClickReset}>Reset</button> <button onClick={handleClickClose}>Close</button> <button onClick={handleClickApply}>Apply</button>
        </div>
      </div>
    </div>
  );
}
