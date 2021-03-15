import { getCtr } from "skandha";

import { Addition } from "../Addition";
import { Insertion } from "../Insertion";
import { DragSourceFromNewItem } from "./DragSourceFromNewItem";

export function newItemsAreInsertedWhenConfirmed(facet: Addition) {
  const ctr = getCtr(facet);
  const drag = DragSourceFromNewItem(ctr);
  if (drag) {
    Insertion.get(ctr).insertItems(drag);
  }
}
