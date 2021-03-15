import { getCtr } from "skandha";
import { Selection } from "../Selection";
import { Highlight } from "../Highlight";

export function highlightFollowsSelection(
  facet: Selection,
  { itemId, isShift, isCtrl }: any
) {
  const ctr = getCtr(facet);
  if (!isCtrl && !isShift) {
    Highlight.get(ctr).highlightItem(itemId);
  }
}
