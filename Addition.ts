import { operation, data } from "skandha";
import { host, stub } from "aspiration";

type GenericObjectT = any;

export class Addition_add<ValueT> {
  values: GenericObjectT;
  createItem(): ValueT {
    return stub();
  }
  createItem_post() {}
}
export class Addition_confirm<ValueT> {
  confirm() {}
}
export class Addition_cancel<ValueT> {}

export const cbs = {
  Addition_add,
  Addition_confirm,
  Addition_cancel,
};

export class Addition<ValueT = any> {
  @data item: ValueT | undefined;
  @data parentId: any;

  @operation @host add(values: GenericObjectT) {
    return (cbs: Addition_add<ValueT>) => {
      this.item = cbs.createItem();
      cbs.createItem_post && cbs.createItem_post();
    };
  }

  @operation @host confirm() {
    return (cbs: Addition_confirm<ValueT>) => {
      cbs.confirm();
      this._reset();
    };
  }

  @operation @host cancel() {
    return (cbs: Addition_cancel<ValueT>) => {
      this._reset();
    };
  }

  _reset() {
    this.item = undefined;
    this.parentId = undefined;
  }

  static get = (ctr: any): Addition => ctr.addition;
}

export const initAddition = (self: Addition): Addition => {
  return self;
};
