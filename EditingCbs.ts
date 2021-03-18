import { Cbs } from "aspiration";

export class Editing_save extends Cbs {
  values: any;
  saveItem() {}
  refreshView() {}
}

export class Editing_cancel extends Cbs {}

export class Editing_enable extends Cbs {}

export type EditingCbs = {
  save: Editing_save;
  cancel: Editing_cancel;
  enable: Editing_enable;
};
