import { getf, getc } from "skandha";
import { Selection } from "../Selection";
import { Highlight } from "../Highlight";

export function highlightFollowsSelection(
  facet: Selection,
  { itemId, isShift, isCtrl }: any
) {
  const ctr = getc(facet);
  if (!isCtrl && !isShift) {
    getf(Highlight, ctr).highlightItem(itemId);
  }
}
