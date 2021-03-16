import { data, input, operation } from "skandha";
import { getm, GetterT, mapDatas } from "skandha";
import { host, stub } from "aspiration";

import { lookUp } from "./internal/utils";

export type IdsByLabelT = { [label: string]: Array<any> };
export type ItemsByLabelT = { [label: string]: Array<any> };
export type LabelValueT = { label: string; id: any; flag: boolean };

export class Labelling_setLabel {
  labelValue: LabelValueT = stub();
  saveIds(label: string, ids: any[]) {}
}

export class Labelling {
  @data idsByLabel: IdsByLabelT = {};
  ids = (label: string) => this.idsByLabel[label] || [];

  @input itemsByLabel?: ItemsByLabelT;

  @operation @host setLabel(labelValue: LabelValueT) {
    return (cbs: Labelling_setLabel) => {
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

  static get = (ctr: any): Labelling => ctr.labelling;
}

export const initLabelling = (self: Labelling): Labelling => {
  return self;
};

export const labellingActsOnItems = (getItemById: GetterT) => {
  return mapDatas(
    [
      //
      getItemById,
      getm([Labelling, "idsByLabel"]),
    ],
    [Labelling, "itemsByLabel"],
    (itemById: any, idsByLabel: any) =>
      Object.fromEntries(
        Object.entries(idsByLabel).map(([label, ids]) =>
          lookUp(ids as any, itemById)
        )
      )
  );
};
