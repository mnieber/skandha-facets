import { Cbs } from 'aspiration';

export type DeletionOptionsT = {
  moveToTrash?: boolean;
};

export interface Deletion_delete extends Cbs {
  itemIds: string[];
  options?: DeletionOptionsT;
  deleteItems(): any;
}

export type DeletionCbs = {
  delete: Deletion_delete;
};
