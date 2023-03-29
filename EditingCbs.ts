import type { Cbs } from 'aspiration';

export interface Editing_save extends Cbs {
  values: any;
  saveItem(): any;
}

export interface Editing_cancel extends Cbs {
  onCancel(): void;
}

export interface Editing_enable extends Cbs {
  onEnable(): void;
}

export interface EditingCbs {
  save: Editing_save;
  cancel: Editing_cancel;
  enable: Editing_enable;
}
