import { getc, getf } from 'skandha';

import { Addition } from '../facets/Addition';
import { Filtering } from '../facets/Filtering';

export function filteringIsDisabledOnNewItem(facet: Addition) {
  const ctr = getc(facet);
  getf(Filtering, ctr).setEnabled({ flag: false });
}
