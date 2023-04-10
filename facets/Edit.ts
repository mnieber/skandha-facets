import { data, decorateCb, operation } from 'skandha';
import { Cbs, getCallbacks, host } from '../lib/cbs';

export class Edit {
  static className = () => 'Edit';

  @data isEditing: boolean = false;

  @operation @host() save(args: { values: any }) {
    const cbs = getCallbacks(this) as EditCbs['save'];

    return Promise.resolve(cbs.saveItem()).then(
      decorateCb((localItem: any) => {
        this.isEditing = false;
        return localItem;
      })
    );
  }

  @operation @host() cancel() {
    const cbs = getCallbacks(this) as EditCbs['cancel'];

    if (this.isEditing) {
      this.isEditing = false;
      cbs.onCancel && cbs.onCancel();
    }
  }

  @operation @host() enable() {
    const cbs = getCallbacks(this) as EditCbs['enable'];

    if (!this.isEditing) {
      this.isEditing = true;
      cbs.onEnable && cbs.onEnable();
    }
  }
}

export interface EditCbs {
  save: Cbs<Edit['save']> & {
    saveItem(): any;
  };
  cancel: Cbs<Edit['cancel']> & {
    onCancel(): void;
  };
  enable: Cbs<Edit['enable']> & {
    onEnable(): void;
  };
}
