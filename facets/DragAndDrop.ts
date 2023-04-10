import { operation } from 'skandha';
import { Cbs, getCallbacks, host } from '../lib/cbs';
import { selectionIsInsertedOnDragAndDrop } from '../policies/selectionIsInsertedOnDragAndDrop';
import { DropPositionT } from './Insertion';

const dropDefaultCbs = (dragAndDrop: DragAndDrop) => ({
  drop: function (this: DragAndDropCbs['drop']) {
    selectionIsInsertedOnDragAndDrop(dragAndDrop, this.args.dropPosition);
  },
});

export class DragAndDrop {
  static className = () => 'DragAndDrop';

  @operation @host(dropDefaultCbs) drop(args: {
    //
    dropPosition: DropPositionT;
  }) {
    const cbs = getCallbacks(this) as DragAndDropCbs['drop'];

    return Promise.resolve(cbs.drop());
  }
}

export interface DragAndDropCbs {
  drop: Cbs<DragAndDrop['drop']> & {
    drop(): void;
  };
}
