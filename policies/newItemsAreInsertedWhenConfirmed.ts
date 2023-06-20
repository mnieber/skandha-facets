import { getc, getf } from 'skandha';

import { Addition } from '../facets/Addition';
import { Insertion } from '../facets/Insertion';
import { DragSourceFromNewItem } from './DragSourceFromNewItem';

export function newItemsAreInsertedWhenConfirmed(facet: Addition) {
  const ctr = getc(facet);
  const hoverPosition = DragSourceFromNewItem(ctr);
  if (hoverPosition) {
    getf(Insertion, ctr).insertItems({ hoverPosition: hoverPosition });
  }
}
