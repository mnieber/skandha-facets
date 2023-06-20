import { data, operation } from 'skandha';

export type HoverPositionT = {
  isBefore: boolean;
  targetItemId: string;
  payload?: any;
};

export class Hovering {
  static className = () => 'Hovering';

  @data hoverPosition?: HoverPositionT;

  @operation({ log: false }) setHoverPosition(hoverPosition?: HoverPositionT) {
    this.hoverPosition = hoverPosition;
  }
}
