import { Cbs, stub } from "aspiration";

export type SelectionParamsT = {
  itemId: string | undefined;
  isShift?: boolean;
  isCtrl?: boolean;
  context?: any;
};

export class Selection_selectItem extends Cbs {
  selectionParams: SelectionParamsT = stub();
  selectItem() {}
}

export type SelectionCbs = {
  selectItem: Selection_selectItem;
};
