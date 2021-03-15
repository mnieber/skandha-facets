import { getCtr } from "skandha";

import { Editing } from "../Editing";
import { Addition } from "../Addition";

export function newItemsAreConfirmedOnEditingSave(facet: Editing, values: any) {
  const ctr = getCtr(facet);
  const addition = Addition.get(ctr);
  if (values.id === undefined) {
    throw Error("No id in item");
  }
  if (values.id === addition.item?.id) {
    Addition.get(ctr).confirm();
  }
}

export function newItemsAreCancelledOnEditingCancel(facet: Editing) {
  const ctr = getCtr(facet);
  if (Addition.get(ctr).item) {
    Addition.get(ctr).cancel();
  }
}
