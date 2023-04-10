import { data, operation } from 'skandha';
import { Cbs, getCallbacks, host } from '../lib/cbs';

export class Deletion {
  static className = () => 'Deletion';

  @data disabled?: boolean = undefined;

  @operation @host() delete(args: {
    itemIds: string[];
    moveToTrash?: boolean;
  }) {
    const cbs = getCallbacks(this) as DeletionCbs['delete'];

    return Promise.resolve(cbs.deleteItems());
  }
}

export type DeletionCbs = {
  delete: Cbs<Deletion['delete']> & {
    deleteItems(): any;
  };
};
