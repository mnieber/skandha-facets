import { DefineCbs, getCallbacks, stub, withCbs } from 'aspiration';
import { input, operation, output } from 'skandha';
import { getPreview } from '../lib/getPreview';
import { HoverPositionT } from './Hovering';

export type DragSourceT = (ctr: any) => HoverPositionT | undefined;

export class Insertion<T = any> {
  static className = () => 'Insertion';

  @input inputItems: Array<T> = stub;
  @output preview: Array<T> = stub;
  @operation @withCbs() insertItems(args: { hoverPosition: HoverPositionT }) {
    const cbs = getCallbacks(this) as InsertionCbs<T>['insertItems'];

    if (this.inputItems) {
      const preview: Array<T> = getPreview(
        this.inputItems,
        args.hoverPosition.targetItemId,
        args.hoverPosition.isBefore,
        args.hoverPosition.payload
      );
      return Promise.resolve(cbs.insertItems(preview));
    }
    return Promise.resolve();
  }
}

type Cbs<T> = {
  insertItems: {
    insertItems(preview: Array<T>): any;
  };
};

export type InsertionCbs<T = any> = DefineCbs<Insertion<T>, Cbs<T>>;
