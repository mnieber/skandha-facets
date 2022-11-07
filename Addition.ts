import { getCallbacks, host } from 'aspiration';
import { data, operation } from 'skandha';
import { AdditionCbs, GenericObjectT } from './AdditionCbs';
export type { AdditionCbs } from './AdditionCbs';

export class Addition<ValueT = any> {
  static className = () => 'Addition';

  @data item?: ValueT;
  @data parentId?: string;

  @operation @host(['values']) add(values: GenericObjectT) {
    const cbs = getCallbacks<AdditionCbs<ValueT>['add']>(this);
    cbs.storeLocation && cbs.storeLocation();
    return Promise.resolve(cbs.createItem()).then((item: ValueT) => {
      this.item = item;
      cbs.highlightNewItem && cbs.highlightNewItem();
    });
  }

  @operation @host confirm() {
    const cbs = getCallbacks<AdditionCbs<ValueT>['confirm']>(this);
    return Promise.resolve(cbs.confirm()).then(() => {
      this._reset();
    });
  }

  @operation @host cancel() {
    const cbs = getCallbacks<AdditionCbs<ValueT>['cancel']>(this);
    return Promise.resolve(this._reset()).then(() => {
      cbs.restoreLocation && cbs.restoreLocation();
    });
  }

  _reset() {
    this.item = undefined;
    this.parentId = undefined;
  }
}
