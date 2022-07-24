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
  inputItemIds: any[],
  filteredItemIds: any[]
) {
  if (
    highlight.id &&
    inputItemIds.includes(highlight.id) &&
    !filteredItemIds.includes(highlight.id)
  ) {
    const highlightedItemIdx = inputItemIds.indexOf(highlight.id);
    const newIdx =
      _findNeighbourIdx(
        filteredItemIds,
        inputItemIds,
        highlightedItemIdx,
        inputItemIds.length,
        1
      ) ||
      _findNeighbourIdx(
        filteredItemIds,
        inputItemIds,
        highlightedItemIdx,
        -1,
        -1
      );

    if (newIdx) {
      highlight.highlightItem(inputItemIds[newIdx.result]);
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
