import { getf } from 'skandha';
import { Highlight } from '../Highlight';
import { Selection } from '../Selection';

export type PropsT = {
  container: any;
};

export class SelectWithKeys {
  props: PropsT;

  constructor(props: PropsT) {
    this.props = props;
  }

  handle(keysUp: Array<string>, keysDown: Array<string>) {
    return {
      onKeyDown: (key: string, e: any) => {
        const ctr = this.props.container;
        const highlight = getf(Highlight, ctr);
        const selection = getf(Selection, ctr);

        const isDown = keysDown.includes(key);
        if (keysUp || keysDown) {
          e.preventDefault();
          e.stopPropagation();
          if (highlight.id) {
            const selectItemById = (itemId: any) => {
              selection.selectItem({
                itemId: itemId,
                isShift: e.shiftKey,
                isCtrl: false,
              });
              if (e.shiftKey) {
                highlight.highlightItem(itemId);
              }
            };

            pickNeighbour(
              selection.selectableIds || [],
              highlight.id,
              isDown,
              selectItemById
            );
          }
        }
      },
    };
  }
}

function pickNeighbour(
  allItems: Array<any>,
  pickedItem: any,
  isForward: boolean,
  pickItem: (x: any) => void
) {
  const idx = allItems.findIndex((x) => x === pickedItem);

  if (isForward && idx + 1 < allItems.length) {
    pickItem(allItems[idx + 1]);
    return true;
  }
  if (!isForward && idx - 1 >= 0) {
    pickItem(allItems[idx - 1]);
    return true;
  }
  return false;
}
