import { data, operation } from "skandha";
import { host, maybe } from "aspiration";
import { EditingCbs } from "./EditingCbs";
export type { EditingCbs } from "./EditingCbs";

export class Editing {
  @data isEditing: boolean = false;

  @operation @host save(values: any) {
    return (cbs: EditingCbs["save"]) => {
      cbs.saveItem();
      this.isEditing = false;
      maybe(cbs.refreshView)();
    };
  }

  @operation @host cancel() {
    return (cbs: EditingCbs["cancel"]) => {
      this.isEditing = false;
    };
  }

  @operation @host enable() {
    return (cbs: EditingCbs["enable"]) => {
      this.isEditing = true;
    };
  }
}
