import { getc, getf } from 'skandha';

import { DragAndDrop } from '../facets/DragAndDrop';
import { DropPositionT, Insertion } from '../facets/Insertion';
import { Selection } from '../facets/Selection';

export function selectionIsInsertedOnDragAndDrop(
  facet: DragAndDrop,
  dropPosition: DropPositionT
) {
  const ctr = getc(facet);
  getf(Insertion, ctr).insertItems({
    ...dropPosition,
    payload: getf(Selection, ctr).items,
  });
}
