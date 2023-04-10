import { data, input, operation, output } from 'skandha';
import { range } from '../internal/utils';
import { Cbs, getCallbacks, host, stub } from '../lib/cbs';

const selectItemDefaultCbs = (selection: Selection) => ({
  selectItem: function (this: SelectionCbs['selectItem']) {
    handleSelectItem(selection, this.args);
  },
});

export class Selection<ValueT = any> {
  static className = () => 'Selection';

  @input selectableIds: Array<string> = stub;
  @data ids: Array<string> = [];
  @data anchorId?: string;
  @output items: Array<ValueT> = stub;

  @operation @host(selectItemDefaultCbs) selectItem(args: {
    itemId: string | undefined;
    isShift?: boolean;
    isCtrl?: boolean;
    context?: any;
  }) {
    const cbs = getCallbacks(this) as SelectionCbs['selectItem'];

    cbs.selectItem();
  }
}

export interface SelectionCbs {
  selectItem: Cbs<Selection['selectItem']> & {
    selectItem(): void;
  };
}

export function handleSelectItem(
  facet: Selection,
  args: {
    itemId: string | undefined;
    isShift?: boolean;
    isCtrl?: boolean;
  }
) {
  if (args.itemId === undefined) {
    facet.ids = [];
    facet.anchorId = undefined;
    return;
  }

  const hasItem = facet.ids.includes(args.itemId);
  const selectableIds = facet.selectableIds;

  if (!selectableIds) {
    throw Error('logical error');
  }

  if (args.isShift) {
    const startItemId = facet.anchorId || args.itemId;
    const startIdx = selectableIds.indexOf(startItemId);
    const stopIdx = selectableIds.indexOf(args.itemId);
    const idxRange = range(
      Math.min(startIdx, stopIdx),
      1 + Math.max(startIdx, stopIdx)
    );
    facet.ids = idxRange.map((idx) => selectableIds[idx]);
  } else if (args.isCtrl) {
    facet.ids = hasItem
      ? facet.ids.filter((x) => x !== args.itemId)
      : [...facet.ids, args.itemId];
  } else {
    facet.ids = [args.itemId];
  }

  // Move the anchor
  if (!facet.anchorId || !(args.isCtrl || args.isShift)) {
    facet.anchorId = args.itemId;
  }
}
