import { getf, getc } from "skandha";

import { Insertion, DropPositionT } from "../Insertion";
import { DragAndDrop } from "../DragAndDrop";
import { Selection } from "../Selection";

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
