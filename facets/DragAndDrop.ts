import { getCallbacks, host } from 'aspiration';
import { operation } from 'skandha';
import { selectionIsInsertedOnDragAndDrop } from '../policies/selectionIsInsertedOnDragAndDrop';
import { DragAndDropCbs } from './DragAndDropCbs';
import { DropPositionT } from './Insertion';
export type { DragAndDropCbs } from './DragAndDropCbs';

const dropDefaultCbs = (dragAndDrop: DragAndDrop) => ({
  drop: function (this: DragAndDropCbs['drop']) {
    selectionIsInsertedOnDragAndDrop(dragAndDrop, this.dropPosition);
  },
});

export class DragAndDrop {
  static className = () => 'DragAndDrop';

  @operation @host(['dropPosition'], dropDefaultCbs) drop(
    dropPosition: DropPositionT
  ) {
    const cbs = getCallbacks<DragAndDropCbs['drop']>(this);

    return Promise.resolve(cbs.drop());
  }
}
