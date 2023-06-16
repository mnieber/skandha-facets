import { DefineCbs, getCallbacks, stub, withCbs } from 'aspiration';
import { input, operation, output } from 'skandha';
import { getPreview } from '../lib/getPreview';

export type DropPositionT = {
  isBefore: boolean;
  targetItemId: string;
};

export type DragT = DropPositionT & {
  payload: any;
};

export type DragSourceT = (ctr: any) => DragT | undefined;

export class Insertion<T = any> {
  static className = () => 'Insertion';

  @input inputItems: Array<T> = stub;
  @output preview: Array<T> = stub;
  @operation @withCbs() insertItems(args: { drag: DragT }) {
    const cbs = getCallbacks(this) as InsertionCbs<T>['insertItems'];

    if (this.inputItems) {
      const preview: Array<T> = getPreview(
        this.inputItems,
        args.drag.targetItemId,
        args.drag.isBefore,
        args.drag.payload
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
