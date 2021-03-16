import { getf, getc } from "skandha";
import { Addition } from "../Addition";
import { Highlight } from "../Highlight";
import { topOfTheList } from "../lib/getPreview";

export function newItemsAreAddedBelowTheHighlight(facet: Addition) {
  const ctr = getc(facet);
  facet.parentId = getf(Highlight, ctr).id || topOfTheList;
}
