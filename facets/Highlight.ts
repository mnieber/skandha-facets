import { withCbs, type DefineCbs } from 'aspiration';
import { data, input, operation, output, stub } from 'skandha';

export class Highlight<T = any> {
  static className = () => 'Highlight';

  callbackMap = {} as DefineCbs<{
    set: {
      scrollItemIntoView?: () => void;
    };
  }>;

  @input highlightableIds: Array<string> = stub;
  @data itemId: string | undefined;
  @output item?: T;

  @operation set(args: { itemId: string | undefined }) {
    return withCbs(this.callbackMap, 'set', args, (cbs) => {
      this.itemId = args.itemId;
      cbs.scrollItemIntoView && cbs.scrollItemIntoView();
    });
  }
}
