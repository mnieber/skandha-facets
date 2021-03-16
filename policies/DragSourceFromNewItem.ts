import { Addition } from "../Addition";
import { DragT } from "../Insertion";
import { getf } from "skandha";

export const DragSourceFromNewItem = (ctr: any): DragT | undefined => {
  const addition = getf(Addition, ctr);
  return addition.item && addition.parentId
    ? {
        targetItemId: addition.parentId,
        payload: [addition.item],
        isBefore: false,
      }
    : undefined;
};
