import { isBefore } from '../internal/utils';
import { DragAndDrop } from './DragAndDrop';
import { Hovering } from './Hovering';

export interface DragAndDropUIConnectorT {
  handle(itemId: string): DragAndDropUIPropsT;
}

export type PropsT = {
  dragAndDrop: DragAndDrop;
  hovering: Hovering;
};

export class DragAndDropUIConnector implements DragAndDropUIConnectorT {
  props: PropsT;

  constructor(props: PropsT) {
    this.props = props;
  }

  handle(itemId: string): DragAndDropUIPropsT {
    return {
      draggable: true,
      onDragStart: () => {},
      onDragOver: (e: any) => {
        e.preventDefault();
        this.props.hovering.setHoverPosition({
          targetItemId: itemId,
          isBefore: isBefore(e),
        });
      },
      onDragEnd: () => {
        this.props.hovering.setHoverPosition(undefined);
      },
      onDrop: () => {
        const hoverPosition = this.props.hovering.hoverPosition;
        if (hoverPosition) {
          this.props.dragAndDrop
            .drop({ hoverPosition: hoverPosition })
            .then(() => {
              this.props.hovering.setHoverPosition(undefined);
            });
        }
      },
      dragState: getDragState(this.props.hovering.hoverPosition, itemId),
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
