import { getc, getf } from 'skandha';

import { DragAndDrop } from '../facets/DragAndDrop';
import { DropPositionT, Insertion } from '../facets/Insertion';
import { Selection } from '../facets/Selection';

export function selectionIsInsertedOnDragAndDrop(
  facet: DragAndDrop,
  dropPosition: DropPositionT
) {
  const ctr = getc(facet);
  const selection = getf(Selection, ctr);
  const selectableIds = selection.selectableIds || [];
  const items = selection.items.toSorted(
    (a, b) => selectableIds.indexOf(a.id) - selectableIds.indexOf(b.id)
  );

  getf(Insertion, ctr).insertItems({
    drag: {
      ...dropPosition,
      payload: items,
    },
  });
}
