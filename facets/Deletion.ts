import { getCallbacks, host } from 'aspiration';
import { data, operation } from 'skandha';
import { DeletionCbs, DeletionOptionsT } from './DeletionCbs';
export type { DeletionCbs, DeletionOptionsT } from './DeletionCbs';

export class Deletion {
  static className = () => 'Deletion';

  @data disabled?: boolean = undefined;

  @operation @host(['itemIds', 'options']) delete(
    itemIds: string[],
    options?: DeletionOptionsT
  ) {
    const cbs = getCallbacks<DeletionCbs['delete']>(this);

    return Promise.resolve(cbs.deleteItems());
  }
}
