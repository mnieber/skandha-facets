import { Cbs } from 'aspiration';

export type FilterT<ValueT> = (x: ValueT[]) => ValueT[];

export interface Filtering_apply<ValueT> extends Cbs {
  filter: FilterT<ValueT>;
}

export interface Filtering_setEnabled<ValueT> extends Cbs {
  flag: boolean;
}

export interface FilteringCbs<ValueT = any> {
  apply: Filtering_apply<ValueT>;
  setEnabled: Filtering_setEnabled<ValueT>;
}
