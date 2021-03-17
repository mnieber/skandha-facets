import { data, operation } from "skandha";
import { host } from "aspiration";

export class Editing_save {
  values: any;
  saveItem() {}
}

export class Editing_cancel {}

export class Editing_enable {}

export class Editing {
  @data isEditing: boolean = false;

  @operation @host save(values: any) {
    return (cbs: Editing_save) => {
      cbs.saveItem();
      this.isEditing = false;
    };
  }

  @operation @host cancel() {
    return (cbs: Editing_cancel) => {
      this.isEditing = false;
    };
  }

  @operation @host enable() {
    return (cbs: Editing_enable) => {
      this.isEditing = true;
    };
  }
}
