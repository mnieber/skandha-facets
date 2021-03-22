import { host } from "aspiration";
import {
  data,
  getm,
  GetterT,
  mapDatasToFacet,
  operation,
  output,
} from "skandha";
import { HighlightCbs } from "./HighlightCbs";
export type { HighlightCbs } from "./HighlightCbs";

export class Highlight<ValueT = any> {
  @data id: string | undefined;
  @output item?: ValueT;

  @operation @host highlightItem(id: string) {
    return (cbs: HighlightCbs["highlightItem"]) => {
      this.id = id;
    };
  }
}

export const highlightUsesItemLookUpTable = (getItemById: GetterT) =>
  mapDatasToFacet(
    [Highlight, "item"],
    [
      //
      getItemById,
      getm([Highlight, "id"]),
    ],
    (itemById: any, id: string) => {
      return itemById[id];
    }
  );
