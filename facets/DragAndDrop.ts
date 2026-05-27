import { data, operation } from 'skandha';
import { selectionIsInsertedOnDragAndDrop } from '../policies/selectionIsInsertedOnDragAndDrop';
import { HoverPositionT } from './Hovering';

export class DragAndDrop {
  static className = () => 'DragAndDrop';

  @data isDropping: boolean = false;

  @operation({ log: false }) setIsDropping(isDropping: boolean) {
    this.isDropping = isDropping;
  }

  @operation drop(args: {
    //
    hoverPosition: HoverPositionT;
  }) {
    this.setIsDropping(true);
    return Promise.resolve(this.performDrop(args)).then((response: any) => {
      this.setIsDropping(false);
      return response;
    });
  }

  protected performDrop(args: { hoverPosition: HoverPositionT }): any {
    selectionIsInsertedOnDragAndDrop(this, args.hoverPosition);
  }
}
