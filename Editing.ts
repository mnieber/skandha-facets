import { getCallbacks, host } from 'aspiration';
import { data, decorateCb, operation } from 'skandha';
import { EditingCbs } from './EditingCbs';
export type { EditingCbs } from './EditingCbs';

export class Editing {
  static className = () => 'Editing';

  @data isEditing: boolean = false;

  @operation @host(['values']) save(values: any) {
    const cbs = getCallbacks<EditingCbs['save']>(this);

    return Promise.resolve(cbs.saveItem()).then(
      decorateCb((localItem: any) => {
        this.isEditing = false;
        return localItem;
      })
    );
  }

  @operation @host cancel() {
    const cbs = getCallbacks<EditingCbs['cancel']>(this);

    if (this.isEditing) {
      this.isEditing = false;
      cbs.onCancel && cbs.onCancel();
    }
  }

  @operation @host enable() {
    const cbs = getCallbacks<EditingCbs['enable']>(this);

    if (!this.isEditing) {
      this.isEditing = true;
      cbs.onEnable && cbs.onEnable();
    }
  }
}
