import { DefineCbs, getCallbacks, stub, withCbs } from 'aspiration';
import { data, input, operation, output } from 'skandha';

const highlightItemDefaultCbs = (highlight: Highlight) => ({});

export class Highlight<T = any> {
  static className = () => 'Highlight';

  @input highlightableIds: Array<string> = stub;
  @data itemId: string | undefined;
  @output item?: T;

  @operation @withCbs(highlightItemDefaultCbs) set(args: {
    itemId: string | undefined;
  }) {
    const cbs = getCallbacks(this) as HighlightCbs<T>['set'];

    this.itemId = args.itemId;
    cbs.scrollItemIntoView && cbs.scrollItemIntoView();
  }
}

type Cbs<T> = {
  set: {
    scrollItemIntoView(): void;
  };
};

export type HighlightCbs<T = any> = DefineCbs<Highlight<T>, Cbs<T>>;
