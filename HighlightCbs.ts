import { Cbs } from 'aspiration';
import {
  HighlightUIConnectorOptionsT,
  HighlightUIConnectorT,
} from './HighlightUIConnector';

export interface Highlight_highlightItem extends Cbs {
  id: string;
  scrollItemIntoView(): void;
}

export interface Highlight_createUIConnector extends Cbs {
  uiConnectorOptions?: HighlightUIConnectorOptionsT;
  createUIConnector(): HighlightUIConnectorT;
}

export interface HighlightCbs {
  highlightItem: Highlight_highlightItem;
  createUIConnector: Highlight_createUIConnector;
}
