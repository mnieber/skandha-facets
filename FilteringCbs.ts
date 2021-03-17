import { stub, Cbs } from "aspiration";

export type FilterT = (x: any) => Array<any>;

export class Filtering_apply extends Cbs {
  filter: FilterT = stub();
}

export class Filtering_setEnabled extends Cbs {
  flag: boolean = stub();
}

export type FilteringCbs = {
  apply: Filtering_apply;
  setEnabled: Filtering_setEnabled;
};
