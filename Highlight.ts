import { getm, GetterT, mapDatas, data, operation, output } from "skandha";
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

  static get = (ctr: any): Highlight => ctr.highlight;
}

export const highlightActsOnItems = (getItemById: GetterT) =>
  mapDatas(
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

export const initHighlight = (self: Highlight): Highlight => {
  return self;
};
