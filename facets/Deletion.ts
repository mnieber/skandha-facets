import { DefineCbs, getCallbacks, withCbs } from 'aspiration';
import { data, operation } from 'skandha';

export class Deletion {
  static className = () => 'Deletion';

  @data disabled?: boolean = undefined;
  @data isDeleting: boolean = false;

  @operation({ log: false }) setIsDeleting(isDeleting: boolean) {
    this.isDeleting = isDeleting;
  }

  @operation @withCbs() delete(args: {
    itemIds: string[];
    moveToTrash?: boolean;
  }) {
    const cbs = getCallbacks(this) as DeletionCbs['delete'];

    this.setIsDeleting(true);
    return Promise.resolve(cbs.deleteItems()).then((response: any) => {
      this.setIsDeleting(false);
      return response;
    });
  }
}

type Cbs = {
  delete: {
    deleteItems(): any;
  };
};

export type DeletionCbs = DefineCbs<Deletion, Cbs>;
