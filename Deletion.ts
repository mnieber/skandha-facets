import { host } from 'aspiration';
import { operation } from 'skandha';
import { DeletionCbs } from './DeletionCbs';
export type { DeletionCbs } from './DeletionCbs';

export class Deletion {
  static className = () => 'Deletion';

  @operation @host(['itemIds']) delete(itemIds: string[]) {
    return (cbs: DeletionCbs['delete']): any => {
      return cbs.deleteItems();
    };
  }
}
