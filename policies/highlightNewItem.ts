import { getf, getc } from "skandha";
import { Highlight } from "../Highlight";
import { Addition } from "../Addition";

export function highlightNewItem(facet: Addition) {
  const ctr = getc(facet);
  if (facet.item) {
    getf(Highlight, ctr).highlightItem(facet.item.id);
  }
}
