import { host, stub } from "aspiration";

import {
  getm,
  GetterT,
  mapDatasToFacet,
  data,
  input,
  operation,
  output,
} from "skandha";
import { lookUp, range } from "./internal/utils";

export class Selection_selectItem {
  itemSelectedProps: ItemSelectedPropsT = stub();
  selectItem() {}
}

const selectItemDefaultCbs = (selection: Selection) => ({
  selectItem: function (this: Selection_selectItem) {
    handleSelectItem(selection, this.itemSelectedProps);
  },
});

export type ItemSelectedPropsT = {
  itemId: any;
  isShift?: boolean;
  isCtrl?: boolean;
};

export class Selection {
  @input selectableIds?: Array<any>;
  @data ids: Array<any> = [];
  @data anchorId: any;
  @output items?: Array<any>;

  @operation @host(selectItemDefaultCbs) selectItem(
    itemSelectedProps: ItemSelectedPropsT
  ) {
    return (cbs: Selection_selectItem) => {
      cbs.selectItem();
    };
  }
}

export function handleSelectItem(
  facet: Selection,
  { itemId, isShift, isCtrl }: ItemSelectedPropsT
) {
  const hasItem = facet.ids.includes(itemId);
  const selectableIds = facet.selectableIds;

  if (!selectableIds) {
    throw Error("logical error");
  }

  if (isShift) {
    const startItemId = facet.anchorId || itemId;
    const startIdx = selectableIds.indexOf(startItemId);
    const stopIdx = selectableIds.indexOf(itemId);
    const idxRange = range(
      Math.min(startIdx, stopIdx),
      1 + Math.max(startIdx, stopIdx)
    );
    facet.ids = idxRange.map((idx) => selectableIds[idx]);
  } else if (isCtrl) {
    facet.ids = hasItem
      ? facet.ids.filter((x) => x !== itemId)
      : [...facet.ids, itemId];
  } else {
    facet.ids = [itemId];
  }

  // Move the anchor
  if (!(isCtrl && hasItem) && !(isShift && !!facet.anchorId)) {
    facet.anchorId = itemId;
  }
}

export const selectionActsOnItems = (getItemById: GetterT) =>
  mapDatasToFacet(
    [
      //
      getItemById,
      getm([Selection, "ids"]),
    ],
    [Selection, "items"],
    (itemById: any, ids: any) => {
      return lookUp(ids, itemById);
    }
  );
