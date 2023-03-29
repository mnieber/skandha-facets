import { getCallbacks, host } from 'aspiration';
import { data, decorateCb, operation } from 'skandha';
import { AdditionCbs, GenericObjectT } from './AdditionCbs';
export type { AdditionCbs } from './AdditionCbs';

export class Addition<ValueT = any> {
  static className = () => 'Addition';

  @data item?: ValueT;
  @data parentId?: string;

  @operation @host(['values']) add(values?: GenericObjectT) {
    const cbs = getCallbacks<AdditionCbs<ValueT>['add']>(this);

    cbs.stageAdd && cbs.stageAdd();
    const newItem = values ?? cbs.createItem();
    return Promise.resolve(newItem).then(
      decorateCb((item: ValueT) => {
        this.item = item;
        cbs.highlightNewItem && cbs.highlightNewItem();
        return item;
      })
    );
  }

  @operation @host confirm() {
    const cbs = getCallbacks<AdditionCbs<ValueT>['confirm']>(this);

    const result = cbs.confirmAdd ? cbs.confirmAdd() : undefined;
    return Promise.resolve(result).then(
      decorateCb(() => {
        this._reset();
      })
    );
  }

  @operation @host cancel() {
    const cbs = getCallbacks<AdditionCbs<ValueT>['cancel']>(this);

    this._reset();
    cbs.unstageAdd && cbs.unstageAdd();
  }

  @operation({ log: false }) _reset() {
    this.item = undefined;
    this.parentId = undefined;
  }
}
