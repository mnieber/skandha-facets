import { Cbs, stub } from "aspiration";

export type SelectionParamsT = {
  itemId: string;
  isShift?: boolean;
  isCtrl?: boolean;
};

export class Selection_selectItem extends Cbs {
  itemSelectedProps: SelectionParamsT = stub();
  selectItem() {}
}

export type SelectionCbs = {
  selectItem: Selection_selectItem;
};
