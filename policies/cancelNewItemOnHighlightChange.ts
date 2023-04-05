import { getc, getf } from 'skandha';
import { Addition } from '../facets/Addition';
import { Highlight } from '../facets/Highlight';

export function cancelNewItemOnHighlightChange(facet: Highlight, id: string) {
  const ctr = getc(facet);
  const addedItemId = getf(Addition, ctr).item?.id;
  if (addedItemId && addedItemId !== id) {
    getf(Addition, ctr).cancel();
  }
}
