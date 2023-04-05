import { Highlight } from '../facets/Highlight';

export function correctHighlight(
  highlight: Highlight,
  allItemIds: any[],
  highlightableIds?: string[]
) {
  highlightableIds = highlightableIds ?? highlight.highlightableIds;

  if (
    highlight.id &&
    allItemIds.includes(highlight.id) &&
    !highlightableIds.includes(highlight.id)
  ) {
    const highlightedItemIdx = allItemIds.indexOf(highlight.id);
    const newIdx =
      _findNeighbourIdx(
        highlightableIds,
        allItemIds,
        highlightedItemIdx,
        allItemIds.length,
        1
      ) ||
      _findNeighbourIdx(
        highlightableIds,
        allItemIds,
        highlightedItemIdx,
        -1,
        -1
      );

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
