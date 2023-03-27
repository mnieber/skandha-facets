import { pickNeighbour } from './internal/utils';
import { Selection } from './Selection';
import { SelectionParamsT } from './SelectionCbs';

export type SelectionUIConnectorOptionsT = {
  useMouse?: boolean;
  useKeys?: boolean;
  itemSelector?: string;
  onSelectItem?: Function;
  getSelectableIds?: (e: any) => string[];
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

  _select(e: any, itemId: string) {
    const selectionParams: SelectionParamsT = {
      itemId: itemId,
      isShift: e.shiftKey,
      isCtrl: e.ctrlKey,
    };
    this.props.selection.selectItem(selectionParams);
    if (this.props.options?.onSelectItem) {
      this.props.options.onSelectItem(selectionParams);
    }
  }

  _createMouseDownHandler() {
    return (e: any, itemId: string) => {
      const isSelected = this.props.selection.ids.includes(itemId);
      if (!isSelected) {
        this._selectOnMouseUp = undefined;
        this._select(e, itemId);
      } else {
        this._selectOnMouseUp = itemId;
      }
    };
  }

  _createMouseUpHandler() {
    return (e: any, itemId: string) => {
      const isSelected = this.props.selection.ids.includes(itemId);
      // If the item was already selected and we left-click it without the ctrl key,
      // then we want to singly select it.
      if (
        this._selectOnMouseUp === itemId &&
        (e.ctrlKey || (e.button == 0 && isSelected))
      ) {
        this._select(e, itemId);
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
          this._select({ ...e, ctrlKey: false }, itemId);
        };

        const selectableIds = this.props.options?.getSelectableIds
          ? this.props.options?.getSelectableIds(e)
          : this.props.selection.selectableIds || [];

        // Select the neighbour item
        const newItemId = pickNeighbour(
          selectableIds,
          itemId,
          isDown,
          selectItemById
        );

        // Move the focus to the neighbour item. We assume that the
        // list of UI elements reflects the list of selectable items (that
        // is stored in selection.selectableIds).
        if (newItemId !== itemId) {
          const idx = this.props.selection.selectableIds.indexOf(newItemId);
          const nextElm = document.querySelectorAll(itemSelector)[idx];
          // @ts-ignore
          nextElm && nextElm.focus();
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
  onMouseDown?: any;
  onMouseUp?: any;
  onKeyDown?: any;
};

export function selectionUIHandlers<T extends SelectionUIPropsT>(props: T) {
  return {
    onMouseDown: props.onMouseDown,
    onMouseUp: props.onMouseUp,
    onKeyDown: props.onKeyDown,
  };
}
