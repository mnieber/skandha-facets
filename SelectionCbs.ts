import { Cbs, stub } from "aspiration";

export type ItemSelectedPropsT = {
  itemId: any;
  isShift?: boolean;
  isCtrl?: boolean;
};

export class Selection_selectItem extends Cbs {
  itemSelectedProps: ItemSelectedPropsT = stub();
  selectItem() {}
}

export type SelectionCbs = {
  selectItem: Selection_selectItem;
};
