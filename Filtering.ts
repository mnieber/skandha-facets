import { host, stub } from 'aspiration';
import { data, operation } from 'skandha';
import { FilterT } from './FilteringCbs';
export type { FilteringCbs } from './FilteringCbs';

export class Filtering<ValueT = any> {
  static className = () => 'Filtering';

  @data isEnabled: boolean = false;
  @data filter: FilterT<ValueT> = () => [];
  @data inputItems: Array<ValueT> = stub;
  @data get filteredItems() {
    return this.isEnabled ? this.filter(this.inputItems) : this.inputItems;
  }

  @operation @host(['filter']) apply(filter: FilterT<ValueT>) {
    this.filter = filter;
    this.setEnabled(true);
  }

  @operation @host(['flag']) setEnabled(flag: boolean) {
    this.isEnabled = flag;
  }
}
