import { getc, getf } from 'skandha';

import { Addition } from '../Addition';
import { Editing } from '../Editing';

export function newItemsAreConfirmedOnEditingSave(facet: Editing) {
  const ctr = getc(facet);
  const addition = getf(Addition, ctr);
  if (addition?.item) {
    getf(Addition, ctr).confirm();
  }
}

export function newItemsAreCancelledOnEditingCancel(facet: Editing) {
  const ctr = getc(facet);
  const addition = getf(Addition, ctr);
  if (addition?.item) {
    addition.cancel();
  }
}
