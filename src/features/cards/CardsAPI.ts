
import { ICard } from "./interfaces";
import { API_URLS } from "../../constants";

export function fetchCards() {
  return new Promise<{ data: ICard[] }>((resolve) => {
    fetch(API_URLS.cards)
      .then(res => res.json())
      .then(data => resolve({data:data}))
      .catch(error=>console.log(error))
  }
  );
}
