import { Selection } from './Selection';

export interface SelectionUIConnectorT {
  handle(itemId: string): SelectionUIPropsT;
}

export type PropsT = {
  selection: Selection;
};

export class SelectionUIConnector implements SelectionUIConnectorT {
  props: PropsT;
  _selectOnMouseUp?: string = undefined;

  constructor(props: PropsT) {
    this.props = props;
  }

  handle(itemId: any): SelectionUIPropsT {
    return {
      isSelected: this.props.selection.ids.includes(itemId),
      onMouseDown: (e: any) => {
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
      },
      onMouseUp: (e: any) => {
        const isSelected = this.props.selection.ids.includes(itemId);
        if (this._selectOnMouseUp === itemId && (!e.ctrlKey || isSelected)) {
          this.props.selection.selectItem({
            itemId: itemId,
            isShift: e.shiftKey,
            isCtrl: e.ctrlKey,
          });
        }
        this._selectOnMouseUp = undefined;
      },
    };
  }
}

export type SelectionUIPropsT = {
  isSelected: boolean;
  onClick?: any;
  onMouseDown?: any;
  onMouseUp?: any;
};

export function selectionUIHandlers<T extends SelectionUIPropsT>(props: T) {
  return {
    onClick: props.onClick,
    onMouseDown: props.onMouseDown,
    onMouseUp: props.onMouseUp,
  };
}
