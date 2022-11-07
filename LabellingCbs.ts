import { Cbs } from 'aspiration';

export type LabelValueT = { label: string; id: string; flag: boolean };
export type IdsByLabelT = { [label: string]: Array<any> };
export type ItemsByLabelT = { [label: string]: Array<any> };

export interface Labelling_setLabel extends Cbs {
  labelValue: LabelValueT;
  saveIds(label: string, ids: string[]): any;
}

export interface LabellingCbs {
  setLabel: Labelling_setLabel;
}
