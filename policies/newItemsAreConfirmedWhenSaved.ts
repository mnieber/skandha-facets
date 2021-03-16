import { getf, getc } from "skandha";

import { Editing } from "../Editing";
import { Addition } from "../Addition";

export function newItemsAreConfirmedOnEditingSave(facet: Editing, values: any) {
  const ctr = getc(facet);
  const addition = getf(Addition, ctr);
  if (values.id === undefined) {
    throw Error("No id in item");
  }
  if (values.id === addition.item?.id) {
    getf(Addition, ctr).confirm();
  }
}

export function newItemsAreCancelledOnEditingCancel(facet: Editing) {
  const ctr = getc(facet);
  if (getf(Addition, ctr).item) {
    getf(Addition, ctr).cancel();
  }
}
