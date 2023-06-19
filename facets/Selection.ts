import { DefineCbs, getCallbacks, stub, withCbs } from 'aspiration';
import { data, input, operation, output } from 'skandha';
import { range } from '../internal/utils';

const selectItemDefaultCbs = (selection: Selection) => ({
  selectItem: function (this: SelectionCbs['selectItem']) {
    handleSelectItem(selection, this.args);
  },
});

export class Selection<T = any> {
  static className = () => 'Selection';

  @input selectableIds: Array<string> = stub;
  @data ids: Array<string> = [];
  @data anchorId?: string;
  @output items: Array<T> = stub;

  @operation @withCbs(selectItemDefaultCbs) selectItem(args: {
    itemId: string | undefined;
    isShift?: boolean;
    isCtrl?: boolean;
    context?: any;
  }) {
    const cbs = getCallbacks(this) as SelectionCbs['selectItem'];

    cbs.selectItem();
  }
}

type Cbs<T> = {
  selectItem: {
    selectItem(): void;
  };
};

export type SelectionCbs<T = any> = DefineCbs<Selection<T>, Cbs<T>>;

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
    const idxRange = range(startIdx, stopIdx);
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
