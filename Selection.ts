import { host } from "aspiration";

import {
  getm,
  GetterT,
  mapDatasToFacet,
  mapDataToFacet,
  data,
  input,
  operation,
  output,
} from "skandha";
import { lookUp, range } from "./internal/utils";
import { SelectionParamsT, SelectionCbs } from "./SelectionCbs";
export type { SelectionParamsT, SelectionCbs } from "./SelectionCbs";

const selectItemDefaultCbs = (selection: Selection) => ({
  selectItem: function (this: SelectionCbs["selectItem"]) {
    handleSelectItem(selection, this.itemSelectedProps);
  },
});

export class Selection<ValueT = any> {
  @input selectableIds?: Array<string>;
  @data ids: Array<string> = [];
  @data anchorId?: string;
  @output items?: Array<ValueT>;

  @operation @host(selectItemDefaultCbs) selectItem(
    itemSelectedProps: SelectionParamsT
  ) {
    return (cbs: SelectionCbs["selectItem"]) => {
      cbs.selectItem();
    };
  }
}

export function handleSelectItem(
  facet: Selection,
  { itemId, isShift, isCtrl }: SelectionParamsT
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

export const selectionUsesItemLookUpTable = (getItemById: GetterT) =>
  mapDatasToFacet(
    [
      //
      getItemById,
      getm([Selection, "ids"]),
    ],
    [Selection, "items"],
    (itemById: any, ids: string[]) => {
      return lookUp(ids, itemById);
    }
  );

export const selectionUsesSelectableIds = (getIds: GetterT) =>
  mapDataToFacet(getIds, [Selection, "selectableIds"]);
