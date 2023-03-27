import { getc, getf } from 'skandha';

import { Filtering } from '../Filtering';
import { Highlight } from '../Highlight';

export function highlightIsCorrectedOnFilterChange(facet: Filtering) {
  if (facet.isEnabled) {
    correctHighlight(
      getf(Highlight, getc(facet)),
      (facet.inputItems || []).map((x) => x.id),
      (facet.filteredItems ?? []).map((x) => x.id)
    );
  }
}

export function correctHighlight(
  highlight: Highlight,
  allItemIds: any[],
  visibleItemIds: any[]
) {
  if (
    highlight.id &&
    allItemIds.includes(highlight.id) &&
    !visibleItemIds.includes(highlight.id)
  ) {
    const highlightedItemIdx = allItemIds.indexOf(highlight.id);
    const newIdx =
      _findNeighbourIdx(
        visibleItemIds,
        allItemIds,
        highlightedItemIdx,
        allItemIds.length,
        1
      ) ||
      _findNeighbourIdx(visibleItemIds, allItemIds, highlightedItemIdx, -1, -1);

    if (newIdx) {
      highlight.highlightItem(allItemIds[newIdx.result]);
    }
  }
}

function _findNeighbourIdx(
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
