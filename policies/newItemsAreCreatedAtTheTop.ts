import { Addition } from '../facets/Addition';
import { topOfTheList } from '../lib/getPreview';

export function newItemsAreCreatedAtTheTop(facet: Addition) {
  facet.parentId = topOfTheList;
}
