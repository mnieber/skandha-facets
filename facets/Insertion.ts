import { withCbs, type DefineCbs } from 'aspiration';
import { data, input, operation, output, stub } from 'skandha';
import { getPreview } from '../lib/getPreview';
import { HoverPositionT } from './Hovering';

export type DragSourceT = (ctr: any) => HoverPositionT | undefined;

export class Insertion<T = any> {
  static className = () => 'Insertion';

  callbackMap = {} as DefineCbs<{
    insertItems: {
      insertItems: (preview: Array<T>) => any;
    };
  }>;

  @data isInserting: boolean = false;
  @input inputItems: Array<T> = stub;
  @output preview: Array<T> = stub;

  @operation({ log: false }) setIsInserting(isInserting: boolean) {
    this.isInserting = isInserting;
  }

  @operation insertItems(args: { hoverPosition: HoverPositionT }) {
    return withCbs(this.callbackMap, 'insertItems', args, (cbs) => {
      if (this.inputItems) {
        this.setIsInserting(true);
        const preview: Array<T> = getPreview(
          this.inputItems,
          args.hoverPosition.targetItemId,
          args.hoverPosition.isBefore,
          args.hoverPosition.payload
        );
        return Promise.resolve(cbs.insertItems(preview)).then(
          (response: any) => {
            this.setIsInserting(false);
            return response;
          }
        );
      }
      return Promise.resolve();
    });
  }
}
