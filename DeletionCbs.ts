import { Cbs, stub } from 'aspiration';

export class Deletion_delete extends Cbs {
  itemIds: string[] = stub();
  deleteItems(): any {}
}

export type DeletionCbs = {
  delete: Deletion_delete;
};
