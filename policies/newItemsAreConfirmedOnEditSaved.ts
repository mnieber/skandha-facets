import { getc, getf } from 'skandha';

import { Addition } from '../facets/Addition';
import { Edit } from '../facets/Edit';

export function newItemsAreConfirmedOnEditSave(facet: Edit) {
  const ctr = getc(facet);
  const addition = getf(Addition, ctr);
  if (addition?.item) {
    getf(Addition, ctr).confirm();
  }
}

export function newItemsAreCancelledOnEditCancel(facet: Edit) {
  const ctr = getc(facet);
  const addition = getf(Addition, ctr);
  if (addition?.item) {
    addition.cancel();
  }
}
