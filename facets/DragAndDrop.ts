import { DefineCbs, getCallbacks, withCbs } from 'aspiration';
import { data, operation } from 'skandha';
import { selectionIsInsertedOnDragAndDrop } from '../policies/selectionIsInsertedOnDragAndDrop';
import { HoverPositionT } from './Hovering';

const dropDefaultCbs = (dragAndDrop: DragAndDrop) => ({
  drop: function (this: DragAndDropCbs['drop']) {
    selectionIsInsertedOnDragAndDrop(dragAndDrop, this.args.hoverPosition);
  },
});

export class DragAndDrop {
  static className = () => 'DragAndDrop';

  @data isDropping: boolean = false;

  @operation({ log: false }) setIsDropping(isDropping: boolean) {
    this.isDropping = isDropping;
  }

  @operation @withCbs(dropDefaultCbs) drop(args: {
    //
    hoverPosition: HoverPositionT;
  }) {
    const cbs = getCallbacks(this) as DragAndDropCbs['drop'];

    this.setIsDropping(true);
    return Promise.resolve(cbs.drop()).then((response: any) => {
      this.setIsDropping(false);
      return response;
    });
  }
}

type Cbs = {
  drop: {
    drop(): void;
  };
};

export type DragAndDropCbs = DefineCbs<DragAndDrop, Cbs>;
