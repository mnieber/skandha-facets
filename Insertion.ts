import { GetterT, mapDataToFacet, input, operation } from "skandha";
import { getPreview } from "./lib/getPreview";
import { host } from "aspiration";
import { DragT, InsertionCbs } from "./InsertionCbs";
export type { DragT, DropPositionT, InsertionCbs } from "./InsertionCbs";

export type DragSourceT = (ctr: any) => DragT | undefined;

export class Insertion {
  @input inputItems?: Array<any>;
  @operation @host insertItems(drag: DragT) {
    return (cbs: InsertionCbs["insertItems"]) => {
      if (this.inputItems) {
        const preview: Array<any> = getPreview(
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

export const insertionActsOnItems = (getItems: GetterT) =>
  mapDataToFacet(getItems, [Insertion, "inputItems"]);
