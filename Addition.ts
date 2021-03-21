import { operation, data } from "skandha";
import { host, maybe } from "aspiration";
import { AdditionCbs, GenericObjectT } from "./AdditionCbs";
export type { AdditionCbs } from "./AdditionCbs";

export class Addition<ValueT = any> {
  @data item?: ValueT;
  @data parentId?: string;

  @operation @host add(values: GenericObjectT) {
    return (cbs: AdditionCbs<ValueT>["add"]) => {
      maybe(cbs.storeLocation)();
      this.item = cbs.createItem();
      maybe(cbs.highlightNewItem)();
    };
  }

  @operation @host confirm() {
    return (cbs: AdditionCbs<ValueT>["confirm"]) => {
      cbs.confirm();
      this._reset();
    };
  }

  @operation @host cancel() {
    return (cbs: AdditionCbs<ValueT>["cancel"]) => {
      this._reset();
      maybe(cbs.restoreLocation)();
    };
  }

  _reset() {
    this.item = undefined;
    this.parentId = undefined;
  }
}
