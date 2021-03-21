import { data, operation } from "skandha";
import { DropPositionT } from "./Insertion";
import { isBefore } from "./internal/utils";
import { host } from "aspiration";
import { DragAndDropCbs } from "./DragAndDropCbs";
export type { DragAndDropCbs } from "./DragAndDropCbs";

export class DragAndDrop {
  @data hoverPosition?: DropPositionT;
  @operation @host drop(dropPosition: DropPositionT) {
    return (cbs: DragAndDropCbs["drop"]) => {
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
