import { host, stub } from 'aspiration';
import { data, GetterT, mapDataToFacet, operation } from 'skandha';
import { FilteringCbs, FilterT } from './FilteringCbs';
export type { FilteringCbs } from './FilteringCbs';

export class Filtering<ValueT = any> {
  static className = () => 'Filtering';

  @data isEnabled: boolean = false;
  @data filter: FilterT = () => [];
  @data inputItems: Array<ValueT> = stub();
  @data get filteredItems() {
    return this.isEnabled ? this.filter(this.inputItems) : this.inputItems;
  }

  @operation @host(['filter']) apply(filter: FilterT) {
    return (cbs: FilteringCbs['apply']) => {
      this.filter = filter;
      this.setEnabled(true);
    };
  }

  @operation @host(['flag']) setEnabled(flag: boolean) {
    return (cbs: FilteringCbs['setEnabled']) => {
      this.isEnabled = flag;
    };
  }
}

export const filteringUsesInputItems = (
  getItems: GetterT,
  transform?: Function
) => mapDataToFacet([Filtering, 'inputItems'], getItems, transform);
