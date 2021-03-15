import { getCtr } from "skandha";

import { Addition } from "../Addition";
import { Filtering } from "../Filtering";

export function filteringIsDisabledOnNewItem(facet: Addition) {
  const ctr = getCtr(facet);
  Filtering.get(ctr).setEnabled(false);
}
