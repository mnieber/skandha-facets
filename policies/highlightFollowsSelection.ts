import { getc, getf } from 'skandha';
import { Highlight } from '../facets/Highlight';
import { Selection, SelectionParamsT } from '../facets/Selection';

export function highlightFollowsSelection(
  facet: Selection,
  { itemId, isShift, isCtrl }: SelectionParamsT
) {
  const ctr = getc(facet);
  if (!isCtrl && !isShift) {
    getf(Highlight, ctr).highlightItem(itemId);
  }
}
