import type { Cbs } from 'aspiration';

export interface Editing_save extends Cbs {
  values: any;
  saveItem(): any;
  refreshView(): void;
}

export interface Editing_cancel extends Cbs {}

export interface Editing_enable extends Cbs {}

export interface EditingCbs {
  save: Editing_save;
  cancel: Editing_cancel;
  enable: Editing_enable;
}
