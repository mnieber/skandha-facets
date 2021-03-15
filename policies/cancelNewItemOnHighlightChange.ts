import { getCtr } from "skandha";
import { Addition } from "../Addition";
import { Highlight } from "../Highlight";

export function cancelNewItemOnHighlightChange(facet: Highlight, id: string) {
  const ctr = getCtr(facet);
  const addedItemId = Addition.get(ctr).item?.id;
  if (addedItemId && addedItemId !== id) {
    Addition.get(ctr).cancel();
  }
}
