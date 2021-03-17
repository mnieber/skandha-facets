import { operation } from "skandha";
import { host } from "aspiration";
import { DeletionCbs } from "./DeletionCbs";
export type { DeletionCbs } from "./DeletionCbs";

export class Deletion {
  @operation @host delete(itemIds: string[]) {
    return (cbs: DeletionCbs["delete"]) => {
      cbs.deleteItems();
    };
  }
}
