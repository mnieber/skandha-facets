import { getCallbacks, host, stub } from 'aspiration';
import { data, input, operation, output } from 'skandha';
import { range } from './internal/utils';
import { SelectionCbs, SelectionParamsT } from './SelectionCbs';
import {
  SelectionUIConnector,
  SelectionUIConnectorOptionsT,
} from './SelectionUIConnector';
export type { SelectionCbs, SelectionParamsT } from './SelectionCbs';
export { selectionUIHandlers } from './SelectionUIConnector';
export type {
  SelectionUIConnectorOptionsT,
  SelectionUIConnectorT,
  SelectionUIPropsT,
} from './SelectionUIConnector';

const selectItemDefaultCbs = (selection: Selection) => ({
  selectItem: function (this: SelectionCbs['selectItem']) {
    handleSelectItem(selection, this.selectionParams);
  },
});

const createUIConnectorDefaultCbs = (selection: Selection) => ({
  createUIConnector: function (this: SelectionCbs['createUIConnector']) {
    return new SelectionUIConnector({
      selection,
      options: this.uiConnectorOptions,
    });
  },
});

export class Selection<ValueT = any> {
  static className = () => 'Selection';

  @input selectableIds: Array<string> = stub;
  @data ids: Array<string> = [];
  @data anchorId?: string;
  @output items: Array<ValueT> = stub;

  @operation @host(['selectionParams'], selectItemDefaultCbs) selectItem(
    selectionParams: SelectionParamsT
  ) {
    const cbs = getCallbacks<SelectionCbs['selectItem']>(this);
    cbs.selectItem();
  }

  @host(['uiConnectorOptions'], createUIConnectorDefaultCbs) createUIConnector(
    uiConnectorOptions?: SelectionUIConnectorOptionsT
  ) {
    const cbs = getCallbacks<SelectionCbs['createUIConnector']>(this);
    return cbs.createUIConnector();
  }
}

export function handleSelectItem(
  facet: Selection,
  { itemId, isShift, isCtrl }: SelectionParamsT
) {
  if (itemId === undefined) {
    facet.ids = [];
    facet.anchorId = undefined;
    return;
  }

  const hasItem = facet.ids.includes(itemId);
  const selectableIds = facet.selectableIds;

  if (!selectableIds) {
    throw Error('logical error');
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
  if (!facet.anchorId || !(isCtrl || isShift)) {
    facet.anchorId = itemId;
  }
}
