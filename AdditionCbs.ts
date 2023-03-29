import { Cbs } from 'aspiration';

export type GenericObjectT = any;

export interface Addition_add<ValueT> extends Cbs {
  values: GenericObjectT;
  stageAdd(): void;
  createItem(): ValueT;
  highlightNewItem(): void;
}

export interface Addition_confirm extends Cbs {
  confirmAdd(): void;
}

export interface Addition_cancel extends Cbs {
  unstageAdd(): void;
}

export interface AdditionCbs<ValueT = any> {
  add: Addition_add<ValueT>;
  confirm: Addition_confirm;
  cancel: Addition_cancel;
}
