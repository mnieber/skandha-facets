import { Cbs, stub } from 'aspiration';

export type DropPositionT = {
  isBefore: boolean;
  targetItemId: string;
};

export type DragT = DropPositionT & {
  payload: any;
};

export class Insertion_insertItems<ValueT> extends Cbs {
  drag: DragT = stub;
  insertItems(preview: Array<ValueT>) {}
}

export type InsertionCbs<ValueT = any> = {
  insertItems: Insertion_insertItems<ValueT>;
};
