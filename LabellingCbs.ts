import { Cbs, stub } from "aspiration";

export type LabelValueT = { label: string; id: string; flag: boolean };
export type IdsByLabelT = { [label: string]: Array<any> };
export type ItemsByLabelT = { [label: string]: Array<any> };

export class Labelling_setLabel extends Cbs {
  labelValue: LabelValueT = stub();
  saveIds(label: string, ids: string[]) {}
}

export type LabellingCbs = {
  setLabel: Labelling_setLabel;
};
