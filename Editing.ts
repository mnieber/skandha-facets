import { host, maybe } from 'aspiration';
import { data, operation } from 'skandha';
import { EditingCbs } from './EditingCbs';
export type { EditingCbs } from './EditingCbs';

export class Editing {
  static className = () => 'Editing';

  @data isEditing: boolean = false;

  @operation @host(['values']) save(values: any) {
    return (cbs: EditingCbs['save']) => {
      cbs.saveItem();
      this.isEditing = false;
      maybe(cbs.refreshView).bind(cbs)();
    };
  }

  @operation @host cancel() {
    return (cbs: EditingCbs['cancel']) => {
      this.isEditing = false;
    };
  }

  @operation @host enable() {
    return (cbs: EditingCbs['enable']) => {
      this.isEditing = true;
    };
  }
}
