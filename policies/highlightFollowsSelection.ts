import { getf, getc } from "skandha";
import { Selection, SelectionParamsT } from "../Selection";
import { Highlight } from "../Highlight";

export function highlightFollowsSelection(
  facet: Selection,
  { itemId, isShift, isCtrl }: SelectionParamsT
) {
  const ctr = getc(facet);
  if (!isCtrl && !isShift) {
    getf(Highlight, ctr).highlightItem(itemId);
  }
}
