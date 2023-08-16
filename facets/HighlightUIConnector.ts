import { pickNeighbour } from '../internal/utils';
import { Highlight } from './Highlight';

export interface HighlightUIConnectorT {
  handle(itemId: string): HighlightUIPropsT;
}

export type PropsT = {
  highlight: Highlight;
};

export class HighlightUIConnector implements HighlightUIConnectorT {
  props: PropsT;
  _handleMouseDown: any = undefined;

  constructor(props: PropsT) {
    this.props = props;
    this._handleMouseDown = this._createMouseDownHandler();
  }

  _highlight(e: any, itemId: string) {
    this.props.highlight.highlightItem({ id: itemId });
  }

  _createMouseDownHandler() {
    return (e: any, itemId: string) => {
      const isHighlighted = this.props.highlight.id === itemId;
      if (!isHighlighted) {
        this._highlight(e, itemId);
      }
    };
  }

  handle(itemId: any): HighlightUIPropsT {
    const mouseHandlers = {
      onMouseDown: (e: any) => this._handleMouseDown(e, itemId),
    };

    return {
      isHighlighted: this.props.highlight.id === itemId,
      ...mouseHandlers,
    };
  }
}

export type HighlightUIPropsT = {
  isHighlighted: boolean;
  onMouseDown?: any;
};

export function highlightUIHandlers<T extends HighlightUIPropsT>(props: T) {
  return {
    onMouseDown: props.onMouseDown,
  };
}

export const createHighlightKeyHandlers = (
  highlight: Highlight,
  options?: {
    keyDown?: string;
    keyUp?: string;
    getHighlightableIds?: () => string[];
  }
) => {
  const down = options?.keyDown ?? 'down';
  const up = options?.keyUp ?? 'up';
  const getAnchor = () => highlight.id;
  const getHighlightableIds = () =>
    options?.getHighlightableIds
      ? options?.getHighlightableIds()
      : highlight.highlightableIds ?? [];

  return {
    [down]: () =>
      highlightNext(highlight, getAnchor(), true, getHighlightableIds()),
    [up]: () =>
      highlightNext(highlight, getAnchor(), false, getHighlightableIds()),
  };
};

const highlightNext = (
  highlight: Highlight,
  currentItemId: string | undefined,
  isDown: boolean,
  highlightableIds: string[]
) => {
  const highlightItemById = (itemId: any) => {
    highlight.highlightItem({ id: itemId });
  };
  if (currentItemId !== undefined) {
    pickNeighbour(highlightableIds, currentItemId, isDown, highlightItemById);
  }
};
