import { DefineCbs, stub, withCbs } from 'aspiration';
import { data, operation } from 'skandha';

export type FilterT<T> = (x: T[]) => T[];

export class Filtering<T = any> {
  static className = () => 'Filtering';

  @data isEnabled: boolean = false;
  @data filter: FilterT<T> = () => [];
  @data inputItems: Array<T> = stub;
  @data get filteredItems() {
    return this.isEnabled ? this.filter(this.inputItems) : this.inputItems;
  }

  @operation @withCbs() apply(args: { filter: FilterT<T> }) {
    this.filter = args.filter;
    this.setEnabled({ flag: true });
  }

  @operation @withCbs() setEnabled(args: { flag: boolean }) {
    this.isEnabled = args.flag;
  }
}

type Cbs<T> = {
  apply: {};
  setEnabled: {};
};

export type FilteringCbs<T = any> = DefineCbs<Filtering<T>, Cbs<T>>;
