import { getCallbacks, host, stub } from 'aspiration';
import { data, input, operation } from 'skandha';
import {
  IdsByLabelT,
  ItemsByLabelT,
  LabellingCbs,
  LabelValueT,
} from './LabellingCbs';
export type { LabellingCbs } from './LabellingCbs';

export class Labelling {
  static className = () => 'Labelling';

  @data idsByLabel: IdsByLabelT = {};
  ids = (label: string) => this.idsByLabel[label] || [];

  @input itemsByLabel: ItemsByLabelT = stub;

  @operation @host(['labelValue']) setLabel(labelValue: LabelValueT) {
    const cbs = getCallbacks<LabellingCbs['setLabel']>(this);

    const { label, id, flag } = labelValue;
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
