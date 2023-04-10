import { Cbs } from 'aspiration';

export interface Highlight_highlightItem extends Cbs {
  id: string;
  scrollItemIntoView(): void;
}

export interface HighlightCbs {
  highlightItem: Highlight_highlightItem;
}
