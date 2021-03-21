import { host } from "aspiration";
import { GetterT, input, mapDataToFacet, operation, output } from "skandha";
import { DragT, InsertionCbs } from "./InsertionCbs";
import { getPreview } from "./lib/getPreview";
export type { DragT, DropPositionT, InsertionCbs } from "./InsertionCbs";

export type DragSourceT = (ctr: any) => DragT | undefined;

export class Insertion<ValueT = any> {
  @input inputItems?: Array<ValueT>;
  @output preview?: Array<ValueT>;
  @operation @host insertItems(drag: DragT) {
    return (cbs: InsertionCbs["insertItems"]) => {
      if (this.inputItems) {
        const preview: Array<ValueT> = getPreview(
          this.inputItems,
          drag.targetItemId,
          drag.isBefore,
          drag.payload
        );
        cbs.insertItems(preview);
      }
    };
  }
}

export const insertionUsesInputItems = (getItems: GetterT) =>
  mapDataToFacet(getItems, [Insertion, "inputItems"]);
