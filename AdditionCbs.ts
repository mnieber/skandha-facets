import { stub } from "aspiration";

export type GenericObjectT = any;

class Cbs {
  enter() {}
  exit() {}
}

export class Addition_add<ValueT = any> extends Cbs {
  values: GenericObjectT;
  storeLocation() {}
  createItem(): ValueT {
    return stub();
  }
  highlightNewItem() {}
}

export class Addition_confirm<ValueT = any> extends Cbs {
  confirm() {}
}

export class Addition_cancel<ValueT = any> extends Cbs {
  restoreLocation() {}
}

export type AdditionCbs<ValueT = any> = {
  add: Addition_add<ValueT>;
  confirm: Addition_confirm<ValueT>;
  cancel: Addition_cancel<ValueT>;
};
