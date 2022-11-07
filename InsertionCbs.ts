import { Cbs } from 'aspiration';

export type DropPositionT = {
  isBefore: boolean;
  targetItemId: string;
};

export type DragT = DropPositionT & {
  payload: any;
};

export interface Insertion_insertItems<ValueT> extends Cbs {
  drag: DragT;
  insertItems(preview: Array<ValueT>): any;
}

export interface InsertionCbs<ValueT = any> {
  insertItems: Insertion_insertItems<ValueT>;
}
