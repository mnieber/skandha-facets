import { getCallbacks, host } from 'aspiration';
import { data, decorateCb, operation } from 'skandha';
import { EditCbs } from './EditCbs';
export type { EditCbs } from './EditCbs';

export class Edit {
  static className = () => 'Edit';

  @data isEditing: boolean = false;

  @operation @host(['values']) save(values: any) {
    const cbs = getCallbacks<EditCbs['save']>(this);

    return Promise.resolve(cbs.saveItem()).then(
      decorateCb((localItem: any) => {
        this.isEditing = false;
        return localItem;
      })
    );
  }

  @operation @host cancel() {
    const cbs = getCallbacks<EditCbs['cancel']>(this);

    if (this.isEditing) {
      this.isEditing = false;
      cbs.onCancel && cbs.onCancel();
    }
  }

  @operation @host enable() {
    const cbs = getCallbacks<EditCbs['enable']>(this);

    if (!this.isEditing) {
      this.isEditing = true;
      cbs.onEnable && cbs.onEnable();
    }
  }
}
