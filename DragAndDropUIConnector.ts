import { data, decorateCb, operation } from 'skandha';
import { DragAndDrop } from './DragAndDrop';
import { DropPositionT } from './Insertion';
import { isBefore } from './internal/utils';

export interface DragAndDropUIConnectorT {
  hoverPosition?: DropPositionT;
  setHoverPosition(x?: DropPositionT): void;
  handle(itemId: string): DragAndDropUIPropsT;
}

export type PropsT = {
  dragAndDrop: DragAndDrop;
};

export class DragAndDropUIConnector implements DragAndDropUIConnectorT {
  props: PropsT;
  @data hoverPosition?: DropPositionT;

  constructor(props: PropsT) {
    this.props = props;
  }

  @operation({ log: false }) setHoverPosition(x?: DropPositionT) {
    this.hoverPosition = x;
  }

  handle(itemId: string): DragAndDropUIPropsT {
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
          this.props.dragAndDrop.drop(this.hoverPosition).then(
            decorateCb(() => {
              this.setHoverPosition(undefined);
            })
          );
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

export type DragAndDropUIPropsT = {
  draggable?: boolean;
  dragState?: string;
  onDragStart?: (event: any) => void;
  onDragOver?: (event: any) => void;
  onDragEnd?: (event: any) => void;
  onDrop?: (event: any) => void;
};

export function dragAndDropUIHandlers<T extends DragAndDropUIPropsT>(props: T) {
  return {
    draggable: props.draggable,
    onDragStart: props.onDragStart,
    onDragOver: props.onDragOver,
    onDrop: props.onDrop,
    onDragEnd: props.onDragEnd,
  };
}
