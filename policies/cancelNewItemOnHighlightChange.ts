import { getc, getf } from 'skandha';
import { Addition } from '../facets/Addition';
import { Highlight } from '../facets/Highlight';

export function cancelNewItemOnHighlightChange(
  facet: Highlight,
  itemId: string
) {
  const ctr = getc(facet);
  const addedItemId = getf(Addition, ctr).item?.id;
  if (addedItemId && addedItemId !== itemId) {
    getf(Addition, ctr).cancel();
  }
}
