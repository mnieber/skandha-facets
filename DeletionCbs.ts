import { Cbs } from 'aspiration';

export interface Deletion_delete extends Cbs {
  itemIds: string[];
  deleteItems(): Promise<any>;
}

export type DeletionCbs = {
  delete: Deletion_delete;
};
