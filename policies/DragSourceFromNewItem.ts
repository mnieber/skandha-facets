import { Addition } from "../Addition";
import { DragT } from "../Insertion";

export const DragSourceFromNewItem = (ctr: any): DragT | undefined => {
  const addition = Addition.get(ctr);
  return addition.item && addition.parentId
    ? {
        targetItemId: addition.parentId,
        payload: [addition.item],
        isBefore: false,
      }
    : undefined;
};
