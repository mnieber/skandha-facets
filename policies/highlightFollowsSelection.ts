import { getc, getf } from 'skandha';
import { Highlight } from '../facets/Highlight';
import { Selection } from '../facets/Selection';

export function highlightFollowsSelection(
  facet: Selection,
  args: { itemId: string | undefined; isShift?: boolean; isCtrl?: boolean }
) {
  const ctr = getc(facet);
  if (!args.isCtrl && !args.isShift) {
    getf(Highlight, ctr).set({ itemId: args.itemId });
  }
}
