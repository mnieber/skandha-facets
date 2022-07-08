import { host } from 'aspiration';
import { data, operation } from 'skandha';
import { DragAndDropCbs } from './DragAndDropCbs';
import { DropPositionT } from './Insertion';
import { isBefore } from './internal/utils';
export type { DragAndDropCbs } from './DragAndDropCbs';

export class DragAndDrop {
  static className = () => 'DragAndDrop';

  @data hoverPosition?: DropPositionT;
  @operation @host(['dropPosition']) drop(dropPosition: DropPositionT) {
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
