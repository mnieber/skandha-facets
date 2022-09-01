import { host, stub } from 'aspiration';
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

  @input itemsByLabel: ItemsByLabelT = stub();

  @operation @host(['labelValue']) setLabel(labelValue: LabelValueT) {
    return (cbs: LabellingCbs['setLabel']) => {
      const { label, id, flag } = labelValue;
      this.idsByLabel[label] = this.idsByLabel[label] || [];
      if (flag && !this.idsByLabel[label].includes(id)) {
        this.idsByLabel[label].push(id);
        cbs.saveIds(label, this.idsByLabel[label]);
      }
      if (!flag && this.idsByLabel[label].includes(id)) {
        this.idsByLabel[label] = this.idsByLabel[label].filter((x) => x !== id);
        cbs.saveIds(label, this.idsByLabel[label]);
      }
    };
  }
}
