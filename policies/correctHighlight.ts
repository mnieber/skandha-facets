import { Highlight } from '../facets/Highlight';

export function correctHighlight(
  highlight: Highlight,
  allItemIds: any[],
  highlightableIds?: string[]
) {
  highlightableIds = highlightableIds ?? highlight.highlightableIds;

  if (
    highlight.itemId &&
    allItemIds.includes(highlight.itemId) &&
    !highlightableIds.includes(highlight.itemId)
  ) {
    const highlightedItemIdx = allItemIds.indexOf(highlight.itemId);
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

    highlight.set({
      itemId: newIdx ? allItemIds[newIdx.result] : undefined,
    });
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
