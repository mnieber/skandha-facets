import { data, operation } from "skandha";
import { DropPositionT } from "./Insertion";
import { isBefore } from "./internal/utils";
import { host, stub } from "aspiration";

export class DragAndDrop_drop {
  dropPosition: DropPositionT = stub();
  drop() {}
}

export class DragAndDrop {
  @data hoverPosition?: DropPositionT;
  @operation @host drop(dropPosition: DropPositionT) {
    return (cbs: DragAndDrop_drop) => {
      cbs.drop();
    };
  }

  @operation({ log: false }) setHoverPosition(x?: DropPositionT) {
    this.hoverPosition = x;
  }

  handle(itemId: any) {
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

export function initDragAndDrop(self: DragAndDrop): DragAndDrop {
  return self;
}
