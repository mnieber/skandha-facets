import { operation } from "skandha";
import { host, stub } from "aspiration";

export class Deletion_delete {
  itemIds: string[] = stub();
  deleteItems() {}
}

export class Deletion {
  @operation @host delete(itemIds: string[]) {
    return (cbs: Deletion_delete) => {
      cbs.deleteItems();
    };
  }

  static get = (ctr: any): Deletion => ctr.deletion;
}

export const initDeletion = (self: Deletion): Deletion => {
  return self;
};
