import { data, output } from 'skandha';
import { listToItemById } from '../internal/utils';

export class Store<T = any> {
  static className = () => 'Store';

  @data items?: T[];

  @output get itemById(): { [id: string]: T } {
    return listToItemById(this.items ?? []);
  }
}
