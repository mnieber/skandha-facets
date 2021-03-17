import { stub, Cbs } from "aspiration";

export class Deletion_delete extends Cbs {
  itemIds: string[] = stub();
  deleteItems() {}
}

export type DeletionCbs = {
  delete: Deletion_delete;
};
