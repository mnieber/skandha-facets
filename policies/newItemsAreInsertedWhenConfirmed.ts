import { getf, getc } from "skandha";

import { Addition } from "../Addition";
import { Insertion } from "../Insertion";
import { DragSourceFromNewItem } from "./DragSourceFromNewItem";

export function newItemsAreInsertedWhenConfirmed(facet: Addition) {
  const ctr = getc(facet);
  const drag = DragSourceFromNewItem(ctr);
  if (drag) {
    getf(Insertion, ctr).insertItems(drag);
  }
}
