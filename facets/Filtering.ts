import { type DefineCbs } from 'aspiration';
import { data, operation, stub } from 'skandha';

export type FilterT<T> = (x: T[]) => T[];

export class Filtering<T = any> {
  static className = () => 'Filtering';

  callbackMap = {} as DefineCbs<{}>;

  @data isEnabled: boolean = false;
  @data filter: FilterT<T> = () => [];
  @data inputItems: Array<T> = stub;
  @data get filteredItems() {
    return this.isEnabled ? this.filter(this.inputItems) : this.inputItems;
  }

  @operation apply(args: { filter: FilterT<T> }) {
    this.filter = args.filter;
    this.setEnabled({ flag: true });
  }

  @operation setEnabled(args: { flag: boolean }) {
    this.isEnabled = args.flag;
  }
}
