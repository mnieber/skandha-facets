import { DefineCbs, getCallbacks, stub, withCbs } from 'aspiration';
import { data, input, operation, output } from 'skandha';

const highlightItemDefaultCbs = (highlight: Highlight) => ({});

export class Highlight<T = any> {
  static className = () => 'Highlight';

  @input highlightableIds: Array<string> = stub;
  @data id: string | undefined;
  @output item?: T;

  @operation @withCbs(highlightItemDefaultCbs) highlightItem(args: {
    id: string | undefined;
  }) {
    const cbs = getCallbacks(this) as HighlightCbs<T>['highlightItem'];

    this.id = args.id;
    cbs.scrollItemIntoView && cbs.scrollItemIntoView();
  }
}

type Cbs<T> = {
  highlightItem: {
    scrollItemIntoView(): void;
  };
};

export type HighlightCbs<T = any> = DefineCbs<Highlight<T>, Cbs<T>>;
