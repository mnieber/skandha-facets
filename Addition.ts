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
    this.item = cbs.createItem();
    cbs.highlightNewItem && cbs.highlightNewItem();
  }

  @operation @host confirm() {
    const cbs = getCallbacks<AdditionCbs<ValueT>['confirm']>(this);
    cbs.confirm();
    this._reset();
  }

  @operation @host cancel() {
    const cbs = getCallbacks<AdditionCbs<ValueT>['cancel']>(this);
    this._reset();
    cbs.restoreLocation && cbs.restoreLocation();
  }

  _reset() {
    this.item = undefined;
    this.parentId = undefined;
  }
}
