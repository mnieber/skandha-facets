import { host, stub } from 'aspiration';
import { input, operation, output } from 'skandha';
import { DragT, InsertionCbs } from './InsertionCbs';
import { getPreview } from './lib/getPreview';
export type { DragT, DropPositionT, InsertionCbs } from './InsertionCbs';

export type DragSourceT = (ctr: any) => DragT | undefined;

export class Insertion<ValueT = any> {
  static className = () => 'Insertion';

  @input inputItems: Array<ValueT> = stub;
  @output preview: Array<ValueT> = stub;
  @operation @host(['drag']) insertItems(drag: DragT) {
    return (cbs: InsertionCbs<ValueT>['insertItems']) => {
      if (this.inputItems) {
        const preview: Array<ValueT> = getPreview(
          this.inputItems,
          drag.targetItemId,
          drag.isBefore,
          drag.payload
        );
        cbs.insertItems(preview);
      }
    };
  }
}
