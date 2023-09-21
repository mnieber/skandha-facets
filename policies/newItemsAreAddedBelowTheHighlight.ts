import { getc, getf } from 'skandha';
import { Addition } from '../facets/Addition';
import { Highlight } from '../facets/Highlight';
import { topOfTheList } from '../lib/getPreview';

export function newItemsAreAddedBelowTheHighlight(facet: Addition) {
  const ctr = getc(facet);
  facet.parentId = getf(Highlight, ctr).itemId || topOfTheList;
}
