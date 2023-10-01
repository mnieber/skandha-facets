import { mergeDeepLeft, withCbs, type Cbs, type DefineCbs } from 'aspiration';
import { data, operation } from 'skandha';
import { selectionIsInsertedOnDragAndDrop } from '../policies/selectionIsInsertedOnDragAndDrop';
import { HoverPositionT } from './Hovering';

const defaultCallbackMap = (dragAndDrop: DragAndDrop) => ({
  drop: {
    drop: function (this: Cbs<DragAndDrop['drop']>) {
      selectionIsInsertedOnDragAndDrop(dragAndDrop, this.args.hoverPosition);
    },
  },
});

export class DragAndDrop {
  static className = () => 'DragAndDrop';

  callbackMap = {} as DefineCbs<{
    drop?: {
      drop?: () => void;
    };
  }>;

  @data isDropping: boolean = false;

  @operation({ log: false }) setIsDropping(isDropping: boolean) {
    this.isDropping = isDropping;
  }

  @operation drop(args: {
    //
    hoverPosition: HoverPositionT;
  }) {
    return withCbs(
      mergeDeepLeft(this.callbackMap, defaultCallbackMap(this)),
      'drop',
      args,
      (cbs) => {
        this.setIsDropping(true);
        return Promise.resolve(cbs!.drop!()).then((response: any) => {
          this.setIsDropping(false);
          return response;
        });
      }
    );
  }
}
