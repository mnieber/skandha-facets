import { stub, Cbs } from "aspiration";

export type GenericObjectT = any;

export class Addition_add<ValueT = any> extends Cbs {
  values: GenericObjectT;
  storeLocation() {}
  createItem(): ValueT {
    return stub();
  }
  highlightNewItem() {}
}

export class Addition_confirm extends Cbs {
  confirm() {}
}

export class Addition_cancel extends Cbs {
  restoreLocation() {}
}

export type AdditionCbs<ValueT = any> = {
  add: Addition_add<ValueT>;
  confirm: Addition_confirm;
  cancel: Addition_cancel;
};
