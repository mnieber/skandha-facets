import { data, output, stub } from 'skandha';
import { listToItemById } from '../internal/utils';

export class Display<T = any> {
  static className = () => 'Display';

  @data items: T[] = stub;

  @output get itemById(): { [id: string]: T } {
    return listToItemById(this.items ?? []);
  }
}
