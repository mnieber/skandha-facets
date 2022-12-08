import { data, operation } from 'skandha';
import { DragAndDrop, DragHandlersT } from '../DragAndDrop';
import { DropPositionT } from '../Insertion';
import { isBefore } from '../internal/utils';

export interface DragAndDropHandlerT {
  hoverPosition?: DropPositionT;
  setHoverPosition(x?: DropPositionT): void;
  handle(itemId: string): DragHandlersT;
}

export type PropsT = {
  dragAndDrop: DragAndDrop;
};

export class DragAndDropHandler implements DragAndDropHandlerT {
  props: PropsT;
  @data hoverPosition?: DropPositionT;

  constructor(props: PropsT) {
    this.props = props;
  }

  @operation({ log: false }) setHoverPosition(x?: DropPositionT) {
    this.hoverPosition = x;
  }

  handle(itemId: string): DragHandlersT {
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
          this.props.dragAndDrop.drop(this.hoverPosition).then(() => {
            this.setHoverPosition(undefined);
          });
        }
      },
      dragState: getDragState(this.hoverPosition, itemId),
    };
  }
}

export function getDragState(hoverPosition: any, itemId: string) {
  return hoverPosition?.targetItemId === itemId
    ? hoverPosition?.isBefore
      ? 'before'
      : 'after'
    : 'none';
}
