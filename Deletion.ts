import { host } from 'aspiration';
import { operation } from 'skandha';
import { DeletionCbs } from './DeletionCbs';
export type { DeletionCbs } from './DeletionCbs';

export class Deletion {
  static className = () => 'Deletion';

  @operation @host delete(itemIds: string[]) {
    return (cbs: DeletionCbs['delete']) => {
      cbs.deleteItems();
    };
  }
}
