import { Cbs } from 'aspiration';

export interface Deletion_delete extends Cbs {
  itemIds: string[];
  deleteItems(): any;
}

export type DeletionCbs = {
  delete: Deletion_delete;
};
