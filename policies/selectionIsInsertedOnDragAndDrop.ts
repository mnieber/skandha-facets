import { getc, getf } from 'skandha';

import { DragAndDrop } from '../facets/DragAndDrop';
import { HoverPositionT } from '../facets/Hovering';
import { Insertion } from '../facets/Insertion';
import { Selection } from '../facets/Selection';

export function selectionIsInsertedOnDragAndDrop(
  facet: DragAndDrop,
  hoverPosition: HoverPositionT
) {
  const ctr = getc(facet);
  const selection = getf(Selection, ctr);
  const selectableIds = selection.selectableIds || [];
  const items = [...selection.items].sort(
    (a, b) => selectableIds.indexOf(a.id) - selectableIds.indexOf(b.id)
  );

  getf(Insertion, ctr).insertItems({
    hoverPosition: {
      ...hoverPosition,
      payload: items,
    },
  });
}
