import { getf, getc } from "skandha";
import { Addition } from "../Addition";
import { Highlight } from "../Highlight";

export function cancelNewItemOnHighlightChange(facet: Highlight, id: string) {
  const ctr = getc(facet);
  const addedItemId = getf(Addition, ctr).item?.id;
  if (addedItemId && addedItemId !== id) {
    getf(Addition, ctr).cancel();
  }
}
