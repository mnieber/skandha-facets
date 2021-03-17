import {
  getm,
  GetterT,
  mapDatasToFacet,
  data,
  operation,
  output,
} from "skandha";
import { host } from "aspiration";
import { HighlightCbs } from "./HighlightCbs";
export type { HighlightCbs } from "./HighlightCbs";

export class Highlight {
  @data id: string | undefined;
  @output item: any;

  @operation @host highlightItem(id: string) {
    return (cbs: HighlightCbs["highlightItem"]) => {
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
