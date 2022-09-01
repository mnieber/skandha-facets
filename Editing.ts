import { host } from 'aspiration';
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
      cbs.refreshView && cbs.refreshView();
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
