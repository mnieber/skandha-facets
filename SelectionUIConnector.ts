import { Selection } from './Selection';

export type SelectionUIConnectorOptionsT = {
  useMouse?: boolean;
  useKeys?: boolean;
  itemSelector?: string;
};

export interface SelectionUIConnectorT {
  handle(itemId: string): SelectionUIPropsT;
}

export type PropsT = {
  selection: Selection;
  options?: SelectionUIConnectorOptionsT;
};

export class SelectionUIConnector implements SelectionUIConnectorT {
  props: PropsT;
  _selectOnMouseUp?: string = undefined;
  _handleKeyDown: any = undefined;
  _handleMouseUp: any = undefined;
  _handleMouseDown: any = undefined;

  constructor(props: PropsT) {
    this.props = props;
    this._handleMouseDown =
      props.options?.useMouse ?? true
        ? this._createMouseDownHandler()
        : undefined;
    this._handleMouseUp =
      props.options?.useMouse ?? true
        ? this._createMouseUpHandler()
        : undefined;
    this._handleKeyDown =
      props.options?.useKeys ?? true ? this._createKeyDownHandler() : undefined;
  }

  _createMouseDownHandler() {
    return (e: any, itemId: string) => {
      const isSelected = this.props.selection.ids.includes(itemId);
      if (!isSelected) {
        this._selectOnMouseUp = undefined;
        this.props.selection.selectItem({
          itemId: itemId,
          isShift: e.shiftKey,
          isCtrl: e.ctrlKey,
        });
      } else {
        this._selectOnMouseUp = itemId;
      }
    };
  }

  _createMouseUpHandler() {
    return (e: any, itemId: string) => {
      const isSelected = this.props.selection.ids.includes(itemId);
      if (this._selectOnMouseUp === itemId && (!e.ctrlKey || isSelected)) {
        this.props.selection.selectItem({
          itemId: itemId,
          isShift: e.shiftKey,
          isCtrl: e.ctrlKey,
        });
      }
      this._selectOnMouseUp = undefined;
    };
  }

  _createKeyDownHandler() {
    return (e: any, itemId: string, itemSelector: string) => {
      const keysDown = ['ArrowDown'];
      const keysUp = ['ArrowUp'];

      const isDown = keysDown.includes(e.key);
      const isUp = keysUp.includes(e.key);
      if (isUp || isDown) {
        e.preventDefault();
        e.stopPropagation();
        const selectItemById = (itemId: any) => {
          this.props.selection.selectItem({
            itemId: itemId,
            isShift: e.shiftKey,
            isCtrl: false,
          });
        };

        // Select the neighbour item
        const hasChanged = pickNeighbour(
          this.props.selection.selectableIds || [],
          itemId,
          isDown,
          selectItemById
        );

        // Move the focus to the neighbour item. We assume that the
        // list of UI elements reflects the list of selectable items (that
        // is stored in selection.selectableIds).
        if (hasChanged) {
          const nextElm = findNextTabStop(e.target, isDown, itemSelector);
          nextElm.focus();
        }
      }
    };
  }

  handle(itemId: any): SelectionUIPropsT {
    const mouseHandlers =
      this.props.options?.useMouse ?? true
        ? {
            onMouseDown: (e: any) => this._handleMouseDown(e, itemId),
            onMouseUp: (e: any) => this._handleMouseUp(e, itemId),
          }
        : {};

    const keyDownHandler =
      this.props.options?.useKeys ?? true
        ? {
            onKeyDown: (e: any) =>
              this._handleKeyDown(e, itemId, this.props.options?.itemSelector),
          }
        : {};

    return {
      isSelected: this.props.selection.ids.includes(itemId),
      ...mouseHandlers,
      ...keyDownHandler,
    };
  }
}

export type SelectionUIPropsT = {
  isSelected: boolean;
  onClick?: any;
  onMouseDown?: any;
  onMouseUp?: any;
  onKeyDown?: any;
};

export function selectionUIHandlers<T extends SelectionUIPropsT>(props: T) {
  return {
    ...(props.onKeyDown ? { tabIndex: 123 } : {}),
    onClick: props.onClick,
    onMouseDown: props.onMouseDown,
    onMouseUp: props.onMouseUp,
    onKeyDown: props.onKeyDown,
  };
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

function findNextTabStop(el: any, isDown: boolean, itemSelector: string) {
  var universe = document.querySelectorAll(itemSelector);
  var list = Array.prototype.filter.call(universe, function (item) {
    return true;
  });
  var index = list.indexOf(el);
  return isDown
    ? list[index + 1] ?? list[0]
    : list[index - 1] ?? list[list.length - 1];
}
