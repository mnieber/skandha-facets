import { getc, getf } from 'skandha';
import { Addition } from '../facets/Addition';
import { Highlight } from '../facets/Highlight';

export function highlightNewItem(facet: Addition) {
  const ctr = getc(facet);
  if (facet.item) {
    getf(Highlight, ctr).highlightItem({ id: facet.item.id });
  }
}
