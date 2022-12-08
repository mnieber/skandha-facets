import { getCallbacks, host } from 'aspiration';
import { operation } from 'skandha';
import { DragAndDropCbs } from './DragAndDropCbs';
import { DragAndDropUIConnector } from './DragAndDropUIConnector';
import { DropPositionT } from './Insertion';
import { selectionIsInsertedOnDragAndDrop } from './policies/selectionIsInsertedOnDragAndDrop';
export type { DragAndDropCbs } from './DragAndDropCbs';
export { dragAndDropUIHandlers } from './DragAndDropUIConnector';
export type {
  DragAndDropUIConnectorT,
  DragAndDropUIPropsT,
} from './DragAndDropUIConnector';

const dropDefaultCbs = (dragAndDrop: DragAndDrop) => ({
  drop: function (this: DragAndDropCbs['drop']) {
    selectionIsInsertedOnDragAndDrop(dragAndDrop, this.dropPosition);
  },
});

const createUIConnectorDefaultCbs = (dragAndDrop: DragAndDrop) => ({
  createUIConnector: function (this: DragAndDropCbs['createUIConnector']) {
    return new DragAndDropUIConnector({ dragAndDrop });
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

  @host([], createUIConnectorDefaultCbs) createUIConnector() {
    const cbs = getCallbacks<DragAndDropCbs['createUIConnector']>(this);
    return cbs.createUIConnector();
  }
}
