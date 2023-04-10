import { Cbs } from 'aspiration';
import { DropPositionT } from './Insertion';

export interface DragAndDrop_drop extends Cbs {
  dropPosition: DropPositionT;
  drop(): void;
}

export interface DragAndDropCbs {
  drop: DragAndDrop_drop;
}
