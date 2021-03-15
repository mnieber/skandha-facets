import { getCtr } from "skandha";

import { Insertion, DropPositionT } from "../Insertion";
import { DragAndDrop } from "../DragAndDrop";
import { Selection } from "../Selection";

export function selectionIsInsertedOnDragAndDrop(
  facet: DragAndDrop,
  dropPosition: DropPositionT
) {
  const ctr = getCtr(facet);
  Insertion.get(ctr).insertItems({
    ...dropPosition,
    payload: Selection.get(ctr).items,
  });
}
