import { host } from 'aspiration';
import {
  data,
  getm,
  GetterT,
  input,
  mapDatasToFacet,
  operation,
} from 'skandha';
import { lookUp } from './internal/utils';
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

  @input itemsByLabel?: ItemsByLabelT;

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

export const labellingActsOnItems = (getItemById: GetterT) => {
  return mapDatasToFacet(
    [Labelling, 'itemsByLabel'],
    [
      //
      getItemById,
      getm([Labelling, 'idsByLabel']),
    ],
    (itemById: any, idsByLabel: any) =>
      Object.fromEntries(
        Object.entries(idsByLabel).map(([label, ids]) =>
          lookUp(ids as string[], itemById)
        )
      )
  );
};
