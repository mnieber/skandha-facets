import { host } from 'aspiration';
import { data, operation } from 'skandha';
import { AdditionCbs, GenericObjectT } from './AdditionCbs';
export type { AdditionCbs } from './AdditionCbs';

export class Addition<ValueT = any> {
  static className = () => 'Addition';

  @data item?: ValueT;
  @data parentId?: string;

  @operation @host(['values']) add(values: GenericObjectT) {
    return (cbs: AdditionCbs<ValueT>['add']) => {
      cbs.storeLocation && cbs.storeLocation();
      this.item = cbs.createItem();
      cbs.highlightNewItem && cbs.highlightNewItem();
    };
  }

  @operation @host confirm() {
    return (cbs: AdditionCbs<ValueT>['confirm']) => {
      cbs.confirm();
      this._reset();
    };
  }

  @operation @host cancel() {
    return (cbs: AdditionCbs<ValueT>['cancel']) => {
      this._reset();
      cbs.restoreLocation && cbs.restoreLocation();
    };
  }

  _reset() {
    this.item = undefined;
    this.parentId = undefined;
  }
}
