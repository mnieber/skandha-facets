import { GetterT, mapDataToFacet, data, operation } from "skandha";
import { host } from "aspiration";
import { FilteringCbs, FilterT } from "./FilteringCbs";
export type { FilteringCbs } from "./FilteringCbs";

export class Filtering<ValueT = any> {
  @data isEnabled: boolean = false;
  @data filter: FilterT = () => [];

  @data inputItems?: Array<ValueT>;
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

export const filteringUsesInputItems = (getItems: GetterT) =>
  mapDataToFacet(getItems, [Filtering, "inputItems"]);
