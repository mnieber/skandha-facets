import {
  getm,
  GetterT,
  mapDatasToFacet,
  data,
  operation,
  output,
} from "skandha";
import { host, stub } from "aspiration";

export class Highlight_highlightItem {
  id: string = stub();
}

export class Highlight {
  @data id: string | undefined;
  @output item: any;

  @operation @host highlightItem(id: string) {
    return (cbs: Highlight_highlightItem) => {
      this.id = id;
    };
  }
}

export const highlightActsOnItems = (getItemById: GetterT) =>
  mapDatasToFacet(
    [
      //
      getItemById,
      getm([Highlight, "id"]),
    ],
    [Highlight, "item"],
    (itemById: any, id: any) => {
      return itemById[id];
    }
  );
