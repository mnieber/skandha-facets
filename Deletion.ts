import { getCallbacks, host } from 'aspiration';
import { operation } from 'skandha';
import { DeletionCbs } from './DeletionCbs';
export type { DeletionCbs } from './DeletionCbs';

export class Deletion {
  static className = () => 'Deletion';

  @operation @host(['itemIds']) delete(itemIds: string[]) {
    const cbs = getCallbacks<DeletionCbs['delete']>(this);
    return Promise.resolve(cbs.deleteItems());
  }
}
