import { data, input, operation } from 'skandha';
import { Cbs, getCallbacks, host, stub } from '../lib/cbs';

export type LabelValueT = { label: string; id: string; flag: boolean };
export type IdsByLabelT = { [label: string]: Array<any> };
export type ItemsByLabelT = { [label: string]: Array<any> };

export class Labelling {
  static className = () => 'Labelling';

  @data idsByLabel: IdsByLabelT = {};
  ids = (label: string) => this.idsByLabel[label] || [];

  @input itemsByLabel: ItemsByLabelT = stub;

  @operation @host() setLabel(args: { labelValue: LabelValueT }) {
    const cbs = getCallbacks<LabellingCbs['setLabel']>(this);

    const { label, id, flag } = args.labelValue;
    this.idsByLabel[label] = this.idsByLabel[label] || [];
    if (flag && !this.idsByLabel[label].includes(id)) {
      this.idsByLabel[label].push(id);
      return Promise.resolve(cbs.saveIds(label, this.idsByLabel[label]));
    }
    if (!flag && this.idsByLabel[label].includes(id)) {
      this.idsByLabel[label] = this.idsByLabel[label].filter((x) => x !== id);
      return Promise.resolve(cbs.saveIds(label, this.idsByLabel[label]));
    }
    return Promise.resolve();
  }
}

export interface LabellingCbs {
  setLabel: Cbs<Labelling['setLabel']> & {
    saveIds(label: string, ids: string[]): any;
  };
}
