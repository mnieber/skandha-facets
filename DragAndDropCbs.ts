import { Cbs } from 'aspiration';
import type { DragAndDropHandlerT } from './handlers/DragAndDropHandler';
import { DropPositionT } from './Insertion';

export interface DragAndDrop_drop extends Cbs {
  dropPosition: DropPositionT;
  drop(): void;
}

export interface DragAndDrop_getHandler extends Cbs {
  getHandler(): DragAndDropHandlerT;
}

export interface DragAndDropCbs {
  drop: DragAndDrop_drop;
  getHandler: DragAndDrop_getHandler;
}
