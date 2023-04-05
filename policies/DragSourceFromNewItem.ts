import { getf } from 'skandha';
import { Addition } from '../facets/Addition';
import { DragT } from '../facets/Insertion';

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
