import { getCtr } from "skandha";

import { Filtering } from "../Filtering";
import { Highlight } from "../Highlight";

function findNeighbourIdx(
  filteredItems: Array<any>,
  allItems: Array<any>,
  beginIndex: number,
  endIndex: number,
  step: number
) {
  for (var idx = beginIndex; idx !== endIndex; idx += step) {
    if (filteredItems.includes(allItems[idx])) {
      return { result: idx };
    }
  }
  return undefined;
}

export function highlightIsCorrectedOnFilterChange(facet: Filtering) {
  const ctr = getCtr(facet);
  if (facet.isEnabled) {
    const highlight = Highlight.get(ctr).id;
    const inputItems = facet.inputItems;
    const filteredItemIds = (facet.filteredItems ?? []).map((x) => x.id);
    const inputIds = (inputItems || []).map((x) => x.id);

    if (
      highlight &&
      inputIds.includes(highlight) &&
      !filteredItemIds.includes(highlight)
    ) {
      console.log("Correcting bad highlight", highlight);
      const highlightedItemIdx = inputIds.indexOf(highlight);
      const newIdx =
        findNeighbourIdx(
          filteredItemIds,
          inputIds,
          highlightedItemIdx,
          inputIds.length,
          1
        ) ||
        findNeighbourIdx(filteredItemIds, inputIds, highlightedItemIdx, -1, -1);

      if (newIdx) {
        Highlight.get(ctr).highlightItem(inputIds[newIdx.result]);
      }
    }
  }
}
