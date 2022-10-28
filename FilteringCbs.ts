import { Cbs, stub } from 'aspiration';

export type FilterT<ValueT> = (x: ValueT[]) => ValueT[];

export class Filtering_apply<ValueT> extends Cbs {
  filter: FilterT<ValueT> = stub;
}

export class Filtering_setEnabled<ValueT> extends Cbs {
  flag: boolean = stub;
}

export type FilteringCbs<ValueT = any> = {
  apply: Filtering_apply<ValueT>;
  setEnabled: Filtering_setEnabled<ValueT>;
};
