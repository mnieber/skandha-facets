import { getCtr } from "skandha";
import { Addition } from "../Addition";
import { Highlight } from "../Highlight";
import { topOfTheList } from "../lib/getPreview";

export function newItemsAreAddedBelowTheHighlight(facet: Addition) {
  const ctr = getCtr(facet);
  facet.parentId = Highlight.get(ctr).id || topOfTheList;
}
