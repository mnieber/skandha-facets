import { Cbs, stub } from "aspiration";

export class Highlight_highlightItem extends Cbs {
  id: string = stub();
}

export type HighlightCbs = {
  highlightItem: Highlight_highlightItem;
};
