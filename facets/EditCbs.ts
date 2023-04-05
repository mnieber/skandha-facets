import type { Cbs } from 'aspiration';

export interface Edit_save extends Cbs {
  values: any;
  saveItem(): any;
}

export interface Edit_cancel extends Cbs {
  onCancel(): void;
}

export interface Edit_enable extends Cbs {
  onEnable(): void;
}

export interface EditCbs {
  save: Edit_save;
  cancel: Edit_cancel;
  enable: Edit_enable;
}
