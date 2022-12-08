import { Cbs } from 'aspiration';
import type { DragAndDropUIConnectorT } from './DragAndDropUIConnector';
import { DropPositionT } from './Insertion';

export interface DragAndDrop_drop extends Cbs {
  dropPosition: DropPositionT;
  drop(): void;
}

export interface DragAndDrop_createUIConnector extends Cbs {
  createUIConnector(): DragAndDropUIConnectorT;
}

export interface DragAndDropCbs {
  drop: DragAndDrop_drop;
  createUIConnector: DragAndDrop_createUIConnector;
}
