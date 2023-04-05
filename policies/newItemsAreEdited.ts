import { getc, getf } from 'skandha';
import { Edit } from '../facets/Edit';

export function editSetEnabled(facet: any) {
  const ctr = getc(facet);
  const edit = getf(Edit, ctr);
  if (!edit.isEdit) {
    edit.enable();
  }
}

export function editSetDisabled(facet: any) {
  const ctr = getc(facet);
  const edit = getf(Edit, ctr);
  if (edit.isEdit) {
    edit.cancel();
  }
}
