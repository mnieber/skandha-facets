import { pickNeighbour } from '../internal/utils';
import { Highlight } from './Highlight';

export type HighlightUIConnectorOptionsT = {
  useMouse?: boolean;
  useKeys?: boolean;
  itemSelector?: string;
  onHighlightItem?: Function;
  isKeyDown?: (e: any) => boolean;
  isKeyUp?: (e: any) => boolean;
  getHighlightableIds?: (e: any) => string[];
};

export interface HighlightUIConnectorT {
  handle(itemId: string): HighlightUIPropsT;
}

export type PropsT = {
  highlight: Highlight;
  options?: HighlightUIConnectorOptionsT;
};

export class HighlightUIConnector implements HighlightUIConnectorT {
  props: PropsT;
  _handleKeyDown: any = undefined;
  _handleMouseDown: any = undefined;

  constructor(props: PropsT) {
    this.props = props;
    this._handleMouseDown =
      props.options?.useMouse ?? true
        ? this._createMouseDownHandler()
        : undefined;
    this._handleKeyDown =
      props.options?.useKeys ?? true
        ? this._createKeyDownHandler(props.options)
        : undefined;
  }

  _highlight(e: any, itemId: string) {
    this.props.highlight.highlightItem(itemId);
    if (this.props.options?.onHighlightItem) {
      this.props.options.onHighlightItem(e, itemId);
    }
  }

  _createMouseDownHandler() {
    return (e: any, itemId: string) => {
      const isHighlighted = this.props.highlight.id === itemId;
      if (!isHighlighted) {
        this._highlight(e, itemId);
      }
    };
  }

  _createKeyDownHandler(options?: HighlightUIConnectorOptionsT) {
    return (e: any, itemId: string, itemSelector: string) => {
      const keysDown = ['ArrowDown'];
      const keysUp = ['ArrowUp'];

      const isDown = options?.isKeyDown
        ? options?.isKeyDown(e)
        : keysDown.includes(e.key);
      const isUp = options?.isKeyUp
        ? options?.isKeyUp(e)
        : keysUp.includes(e.key);

      if (isUp || isDown) {
        e.preventDefault();
        e.stopPropagation();
        const highlightItemById = (itemId: any) => {
          this._highlight({ ...e, ctrlKey: false }, itemId);
        };

        const highlightableIds = this.props.options?.getHighlightableIds
          ? this.props.options?.getHighlightableIds(e)
          : this.props.highlight.highlightableIds || [];

        // Select the neighbour item
        const newItemId = pickNeighbour(
          highlightableIds,
          this.props.highlight.id,
          isDown,
          highlightItemById
        );

        // Move the focus to the neighbour item. We assume that the
        // list of UI elements reflects the list of selectable items (that
        // is stored in highlight.selectableIds).
        if (newItemId !== itemId) {
          const idx = this.props.highlight.highlightableIds.indexOf(newItemId);
          const nextElm = document.querySelectorAll(itemSelector)[idx];
          // @ts-ignore
          nextElm && nextElm.focus();
        }
      }
    };
  }

  handle(itemId: any): HighlightUIPropsT {
    const mouseHandlers =
      this.props.options?.useMouse ?? true
        ? {
            onMouseDown: (e: any) => this._handleMouseDown(e, itemId),
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
      isHighlighted: this.props.highlight.id === itemId,
      ...mouseHandlers,
      ...keyDownHandler,
    };
  }
}

export type HighlightUIPropsT = {
  isHighlighted: boolean;
  onMouseDown?: any;
  onKeyDown?: any;
};

export function highlightUIHandlers<T extends HighlightUIPropsT>(props: T) {
  return {
    onMouseDown: props.onMouseDown,
    onKeyDown: props.onKeyDown,
  };
}
