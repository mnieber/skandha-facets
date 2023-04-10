import { input, operation, output } from 'skandha';
import { Cbs, getCallbacks, host, stub } from '../lib/cbs';
import { getPreview } from '../lib/getPreview';

export type DropPositionT = {
  isBefore: boolean;
  targetItemId: string;
};

export type DragT = DropPositionT & {
  payload: any;
};

export type DragSourceT = (ctr: any) => DragT | undefined;

export class Insertion<ValueT = any> {
  static className = () => 'Insertion';

  @input inputItems: Array<ValueT> = stub;
  @output preview: Array<ValueT> = stub;
  @operation @host() insertItems(args: { drag: DragT }) {
    const cbs = getCallbacks(this) as InsertionCbs<ValueT>['insertItems'];

    if (this.inputItems) {
      const preview: Array<ValueT> = getPreview(
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

export interface InsertionCbs<ValueT = any> {
  insertItems: Cbs<Insertion['insertItems']> & {
    insertItems(preview: Array<ValueT>): any;
  };
}
