import { DefineCbs, getCallbacks, withCbs } from 'aspiration';
import { data, operation } from 'skandha';

export class Deletion {
  static className = () => 'Deletion';

  @data disabled?: boolean = undefined;

  @operation @withCbs() delete(args: {
    itemIds: string[];
    moveToTrash?: boolean;
  }) {
    const cbs = getCallbacks(this) as DeletionCbs['delete'];

    return Promise.resolve(cbs.deleteItems());
  }
}

type Cbs = {
  delete: {
    deleteItems(): any;
  };
};

export type DeletionCbs = DefineCbs<Deletion, Cbs>;
