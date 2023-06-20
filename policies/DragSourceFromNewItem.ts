import { getf } from 'skandha';
import { Addition } from '../facets/Addition';
import { HoverPositionT } from '../facets/Hovering';

export const DragSourceFromNewItem = (ctr: any): HoverPositionT | undefined => {
  const addition = getf(Addition, ctr);
  return addition.item && addition.parentId
    ? {
        targetItemId: addition.parentId,
        payload: [addition.item],
        isBefore: false,
      }
    : undefined;
};
