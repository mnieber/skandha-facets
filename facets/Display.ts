import { stub } from 'aspiration';
import { data, output } from 'skandha';
import { listToItemById } from '../internal/utils';

export class Display<ValueT = any> {
  static className = () => 'Display';

  @data items: ValueT[] = stub;

  @output get itemById(): { [id: string]: ValueT } {
    return listToItemById(this.items ?? []);
  }
}
