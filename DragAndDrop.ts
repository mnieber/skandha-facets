import { getCallbacks, host } from 'aspiration';
import { operation } from 'skandha';
import { DragAndDropCbs } from './DragAndDropCbs';
import { DragAndDropHandler } from './handlers/DragAndDropHandler';
import { DropPositionT } from './Insertion';
import { selectionIsInsertedOnDragAndDrop } from './policies/selectionIsInsertedOnDragAndDrop';

export type { DragAndDropCbs } from './DragAndDropCbs';

const dropDefaultCbs = (dragAndDrop: DragAndDrop) => ({
  drop: function (this: DragAndDropCbs['drop']) {
    selectionIsInsertedOnDragAndDrop(dragAndDrop, this.dropPosition);
  },
});

const getHandlerDefaultCbs = (dragAndDrop: DragAndDrop) => ({
  getHandler: function (this: DragAndDropCbs['getHandler']) {
    return new DragAndDropHandler({ dragAndDrop });
  },
});

export class DragAndDrop {
  static className = () => 'DragAndDrop';

  @operation @host(['dropPosition'], dropDefaultCbs) drop(
    dropPosition: DropPositionT
  ) {
    const cbs = getCallbacks<DragAndDropCbs['drop']>(this);
    return Promise.resolve(cbs.drop());
  }

  @host([], getHandlerDefaultCbs) getHandler() {
    const cbs = getCallbacks<DragAndDropCbs['getHandler']>(this);
    return cbs.getHandler();
  }
}

export type DragHandlersT = {
  draggable?: boolean;
  dragState?: string;
  onDragStart?: (event: any) => void;
  onDragOver?: (event: any) => void;
  onDragEnd?: (event: any) => void;
  onDrop?: (event: any) => void;
};

export function dragHandlers<T extends DragHandlersT>(props: T) {
  return {
    draggable: props.draggable,
    onDragStart: props.onDragStart,
    onDragOver: props.onDragOver,
    onDrop: props.onDrop,
    onDragEnd: props.onDragEnd,
  };
}
