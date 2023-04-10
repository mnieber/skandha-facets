import { data, input, operation, output } from 'skandha';
import { Cbs, getCallbacks, host, stub } from '../lib/cbs';

const highlightItemDefaultCbs = (highlight: Highlight) => ({});

export class Highlight<ValueT = any> {
  static className = () => 'Highlight';

  @input highlightableIds: Array<string> = stub;
  @data id: string | undefined;
  @output item?: ValueT;

  @operation @host(highlightItemDefaultCbs) highlightItem(args: {
    id: string | undefined;
  }) {
    const cbs = getCallbacks(this) as HighlightCbs['highlightItem'];

    this.id = args.id;
    cbs.scrollItemIntoView && cbs.scrollItemIntoView();
  }
}

export interface HighlightCbs {
  highlightItem: Cbs<Highlight['highlightItem']> & {
    scrollItemIntoView(): void;
  };
}
