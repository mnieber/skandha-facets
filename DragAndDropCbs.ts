import { Cbs, stub } from 'aspiration';
import { DropPositionT } from './Insertion';

export class DragAndDrop_drop extends Cbs {
  dropPosition: DropPositionT = stub;
  drop() {}
}

export type DragAndDropCbs = {
  drop: DragAndDrop_drop;
};
