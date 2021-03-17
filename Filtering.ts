import {
  GetterT,
  patchFacet,
  mapDataToFacet,
  data,
  operation,
  output,
} from "skandha";
import { host, stub } from "aspiration";

type FilterT = (x: any) => Array<any>;

export class Filtering_apply {
  filter: FilterT = stub();
}

export class Filtering_setEnabled {
  flag: boolean = stub();
}

export class Filtering {
  @data isEnabled: boolean = false;
  @data filter: FilterT = () => [];

  @data inputItems?: Array<any>;
  @output filteredItems?: Array<any>;

  @operation @host apply(filter: FilterT) {
    return (cbs: Filtering_apply) => {
      this.filter = filter;
      this.isEnabled = true;
    };
  }

  @operation @host setEnabled(flag: boolean) {
    return (cbs: Filtering_setEnabled) => {
      this.isEnabled = flag;
    };
  }
}

const _handleFiltering = (self: Filtering) => {
  patchFacet(self, {
    filteredItems: {
      get(this: Filtering) {
        const isEnabled = this.isEnabled;
        const filter = this.filter;
        return filter && isEnabled
          ? this.filter(this.inputItems)
          : this.inputItems;
      },
    },
  });
};

export const initFiltering = (self: Filtering): Filtering => {
  _handleFiltering(self);
  return self;
};

export const filteringActsOnItems = (getItems: GetterT) =>
  mapDataToFacet(getItems, [Filtering, "inputItems"]);
