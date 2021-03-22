import { Highlight } from "../Highlight";
import { Selection } from "../Selection";
import { getf } from "skandha";

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
            const selectMoveById = (moveId: any) => {
              selection.selectItem({
                itemId: moveId,
                isShift: e.shiftKey,
                isCtrl: false,
              });
              if (e.shiftKey) {
                highlight.highlightItem(moveId);
              }
            };

            pickNeighbour(
              selection.selectableIds || [],
              highlight.id,
              isDown,
              selectMoveById
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
