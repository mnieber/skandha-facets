import { getf, getc } from "skandha";

import { Addition } from "../Addition";
import { Filtering } from "../Filtering";

export function filteringIsDisabledOnNewItem(facet: Addition) {
  const ctr = getc(facet);
  getf(Filtering, ctr).setEnabled(false);
}
