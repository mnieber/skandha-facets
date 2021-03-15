import { getCtr } from "skandha";
import { Highlight } from "../Highlight";
import { Addition } from "../Addition";

export function highlightNewItem(facet: Addition) {
  const ctr = getCtr(facet);
  Highlight.get(ctr).highlightItem(facet.item.id);
}
