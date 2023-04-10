import { data, decorateCb, operation } from 'skandha';
import { Cbs, getCallbacks, host } from '../lib/cbs';

export type GenericObjectT = any;

export class Addition<ValueT = any> {
  static className = () => 'Addition';

  @data item?: ValueT;
  @data parentId?: string;

  @operation @host() add(args: {
    //
    values?: GenericObjectT;
  }) {
    const cbs = getCallbacks(this) as AdditionCbs<ValueT>['add'];

    cbs.stageAdd && cbs.stageAdd();
    const newItem = args.values ?? cbs.createItem();
    return Promise.resolve(newItem).then(
      decorateCb((item: ValueT) => {
        this.item = item;
        cbs.highlightNewItem && cbs.highlightNewItem();
        return item;
      })
    );
  }

  @operation @host() confirm() {
    const cbs = getCallbacks(this) as AdditionCbs<ValueT>['confirm'];

    const result = cbs.confirmAdd ? cbs.confirmAdd() : undefined;
    return Promise.resolve(result).then(
      decorateCb(() => {
        this._reset();
      })
    );
  }

  @operation @host() cancel() {
    const cbs = getCallbacks(this) as AdditionCbs<ValueT>['cancel'];

    if (this.item) {
      this._reset();
      cbs.unstageAdd && cbs.unstageAdd();
    }
  }

  @operation({ log: false }) _reset() {
    this.item = undefined;
    this.parentId = undefined;
  }
}

export interface AdditionCbs<ValueT = any> {
  add: Cbs<Addition['add']> & {
    stageAdd(): void;
    createItem(): ValueT;
    highlightNewItem(): void;
  };
  cancel: Cbs<Addition['cancel']> & {
    unstageAdd(): void;
  };
  confirm: Cbs<Addition['confirm']> & {
    confirmAdd(): void;
  };
}
