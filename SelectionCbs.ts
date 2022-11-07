import { Cbs } from 'aspiration';

export type SelectionParamsT = {
  itemId: string | undefined;
  isShift?: boolean;
  isCtrl?: boolean;
  context?: any;
};

export interface Selection_selectItem extends Cbs {
  selectionParams: SelectionParamsT;
  selectItem(): void;
}

export interface SelectionCbs {
  selectItem: Selection_selectItem;
}
