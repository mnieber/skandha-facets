import { getCallbacks, host } from 'aspiration';
import { data, decorateCb, operation } from 'skandha';
import { AdditionCbs, GenericObjectT } from './AdditionCbs';
export type { AdditionCbs } from './AdditionCbs';

export class Addition<ValueT = any> {
  static className = () => 'Addition';

  @data item?: ValueT;
  @data parentId?: string;

  @operation @host(['values']) add(values: GenericObjectT) {
    const cbs = getCallbacks<AdditionCbs<ValueT>['add']>(this);
    cbs.storeLocation && cbs.storeLocation();
    return Promise.resolve(cbs.createItem()).then(
      decorateCb((item: ValueT) => {
        this.item = item;
        cbs.highlightNewItem && cbs.highlightNewItem();
      })
    );
  }

  @operation @host confirm() {
    const cbs = getCallbacks<AdditionCbs<ValueT>['confirm']>(this);
    return Promise.resolve(cbs.confirm()).then(
      decorateCb(() => {
        this._reset();
      })
    );
  }

  @operation @host cancel() {
    const cbs = getCallbacks<AdditionCbs<ValueT>['cancel']>(this);
    cbs.restoreLocation && cbs.restoreLocation();
  }

  @operation({ log: false }) _reset() {
    this.item = undefined;
    this.parentId = undefined;
  }
}
