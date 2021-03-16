import { GetterT, mapData, input, operation } from "skandha";
import { getPreview } from "./lib/getPreview";
import { host, stub } from "aspiration";

export class Insertion_insertItems {
  drag: DragT = stub();
  insertItems(preview: Array<any>) {}
}

export type DragSourceT = (ctr: any) => DragT | undefined;

export type DropPositionT = {
  isBefore: boolean;
  targetItemId: string;
};

export type DragT = DropPositionT & {
  payload: any;
};

export class Insertion {
  @input inputItems?: Array<any>;
  @operation @host insertItems(drag: DragT) {
    return (cbs: Insertion_insertItems) => {
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

  static get = (ctr: any): Insertion => ctr.insertion;
}

export const initInsertion = (self: Insertion) => {
  return self;
};

export const insertionActsOnItems = (getItems: GetterT) =>
  mapData(getItems, [Insertion, "inputItems"]);
