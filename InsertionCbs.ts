import { Cbs, stub } from "aspiration";

export type DropPositionT = {
  isBefore: boolean;
  targetItemId: string;
};

export type DragT = DropPositionT & {
  payload: any;
};

export class Insertion_insertItems extends Cbs {
  drag: DragT = stub();
  insertItems(preview: Array<any>) {}
}

export type InsertionCbs = {
  insertItems: Insertion_insertItems;
};
