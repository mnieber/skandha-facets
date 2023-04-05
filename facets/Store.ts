import { data, output } from 'skandha';
import { listToItemById } from '../internal/utils';

export class Store<ValueT = any> {
  static className = () => 'Store';

  @data items?: ValueT[];

  @output get itemById(): { [id: string]: ValueT } {
    return listToItemById(this.items ?? []);
  }
}
