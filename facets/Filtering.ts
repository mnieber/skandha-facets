import { data, operation } from 'skandha';
import { Cbs, host, stub } from '../lib/cbs';

export type FilterT<ValueT> = (x: ValueT[]) => ValueT[];

export class Filtering<ValueT = any> {
  static className = () => 'Filtering';

  @data isEnabled: boolean = false;
  @data filter: FilterT<ValueT> = () => [];
  @data inputItems: Array<ValueT> = stub;
  @data get filteredItems() {
    return this.isEnabled ? this.filter(this.inputItems) : this.inputItems;
  }

  @operation @host() apply(args: { filter: FilterT<ValueT> }) {
    this.filter = args.filter;
    this.setEnabled({ flag: true });
  }

  @operation @host() setEnabled(args: { flag: boolean }) {
    this.isEnabled = args.flag;
  }
}

export interface FilteringCbs<ValueT = any> {
  apply: Cbs<Filtering['apply']> & {};
  setEnabled: Cbs<Filtering['setEnabled']> & {};
}
