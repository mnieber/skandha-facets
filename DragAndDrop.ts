import { host } from 'aspiration';
import { data, operation } from 'skandha';
import { DragAndDropCbs } from './DragAndDropCbs';
import { DropPositionT } from './Insertion';
import { isBefore } from './internal/utils';
import { selectionIsInsertedOnDragAndDrop } from './policies/selectionIsInsertedOnDragAndDrop';

export type { DragAndDropCbs } from './DragAndDropCbs';

const dropDefaultCbs = (dragAndDrop: DragAndDrop) => ({
  drop: function (this: DragAndDropCbs['drop']) {
    selectionIsInsertedOnDragAndDrop(dragAndDrop, this.dropPosition);
  },
});

export class DragAndDrop {
  static className = () => 'DragAndDrop';

  @data hoverPosition?: DropPositionT;
  @operation @host(['dropPosition'], dropDefaultCbs) drop(
    dropPosition: DropPositionT
  ) {
    return (cbs: DragAndDropCbs['drop']) => {
      cbs.drop();
    };
  }

  @operation({ log: false }) setHoverPosition(x?: DropPositionT) {
    this.hoverPosition = x;
  }

  handle(itemId: string) {
    return {
      draggable: true,
      onDragStart: () => {},
      onDragOver: (e: any) => {
        e.preventDefault();
        this.setHoverPosition({
          targetItemId: itemId,
          isBefore: isBefore(e),
        });
      },
      onDragEnd: () => {
        this.setHoverPosition(undefined);
      },
      onDrop: () => {
        if (this.hoverPosition) {
          this.drop(this.hoverPosition);
          this.setHoverPosition(undefined);
        }
      },
    };
  }
}

export type DragPropsT = {
  draggable?: boolean;
  onDragStart?: (event: any) => void;
  onDragOver?: (event: any) => void;
  onDragEnd?: (event: any) => void;
  onDrop?: (event: any) => void;
};

export function dragState(hoverPosition: any, itemId: string) {
  return hoverPosition?.targetItemId === itemId
    ? hoverPosition?.isBefore
      ? 'before'
      : 'after'
    : undefined;
}
