import { operation } from 'skandha';
import { DefineCbs, getCallbacks, withCbs } from '../lib/cbs';
import { selectionIsInsertedOnDragAndDrop } from '../policies/selectionIsInsertedOnDragAndDrop';
import { DropPositionT } from './Insertion';

const dropDefaultCbs = (dragAndDrop: DragAndDrop) => ({
  drop: function (this: DragAndDropCbs['drop']) {
    selectionIsInsertedOnDragAndDrop(dragAndDrop, this.args.dropPosition);
  },
});

export class DragAndDrop {
  static className = () => 'DragAndDrop';

  @operation @withCbs(dropDefaultCbs) drop(args: {
    //
    dropPosition: DropPositionT;
  }) {
    const cbs = getCallbacks(this) as DragAndDropCbs['drop'];

    return Promise.resolve(cbs.drop());
  }
}

type Cbs = {
  drop: {
    drop(): void;
  };
};

export type DragAndDropCbs = DefineCbs<DragAndDrop, Cbs>;
