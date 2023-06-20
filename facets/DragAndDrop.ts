import { DefineCbs, getCallbacks, withCbs } from 'aspiration';
import { operation } from 'skandha';
import { selectionIsInsertedOnDragAndDrop } from '../policies/selectionIsInsertedOnDragAndDrop';
import { HoverPositionT } from './Hovering';

const dropDefaultCbs = (dragAndDrop: DragAndDrop) => ({
  drop: function (this: DragAndDropCbs['drop']) {
    selectionIsInsertedOnDragAndDrop(dragAndDrop, this.args.hoverPosition);
  },
});

export class DragAndDrop {
  static className = () => 'DragAndDrop';

  @operation @withCbs(dropDefaultCbs) drop(args: {
    //
    hoverPosition: HoverPositionT;
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
