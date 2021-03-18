import { GetterT, mapDataToFacet, data, operation } from "skandha";
import { host } from "aspiration";
import { FilteringCbs, FilterT } from "./FilteringCbs";
export type { FilteringCbs } from "./FilteringCbs";

export class Filtering {
  @data isEnabled: boolean = false;
  @data filter: FilterT = () => [];

  @data inputItems?: Array<any>;
  @data get filteredItems() {
    return this.isEnabled ? this.filter(this.inputItems) : this.inputItems;
  }

  @operation @host apply(filter: FilterT) {
    return (cbs: FilteringCbs["apply"]) => {
      this.filter = filter;
      this.isEnabled = true;
    };
  }

  @operation @host setEnabled(flag: boolean) {
    return (cbs: FilteringCbs["setEnabled"]) => {
      this.isEnabled = flag;
    };
  }
}

export const filteringActsOnItems = (getItems: GetterT) =>
  mapDataToFacet(getItems, [Filtering, "inputItems"]);
