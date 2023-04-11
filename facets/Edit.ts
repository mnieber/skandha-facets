import { data, decorateCb, operation } from 'skandha';
import { DefineCbs, getCallbacks, withCbs } from '../lib/cbs';

export class Edit {
  static className = () => 'Edit';

  @data isEditing: boolean = false;

  @operation @withCbs() save(args: { values: any }) {
    const cbs = getCallbacks(this) as EditCbs['save'];

    return Promise.resolve(cbs.saveItem()).then(
      decorateCb((localItem: any) => {
        this.isEditing = false;
        return localItem;
      })
    );
  }

  @operation @withCbs() cancel() {
    const cbs = getCallbacks(this) as EditCbs['cancel'];

    if (this.isEditing) {
      this.isEditing = false;
      cbs.onCancel && cbs.onCancel();
    }
  }

  @operation @withCbs() enable() {
    const cbs = getCallbacks(this) as EditCbs['enable'];

    if (!this.isEditing) {
      this.isEditing = true;
      cbs.onEnable && cbs.onEnable();
    }
  }
}

export type Cbs = {
  save: {
    saveItem(): any;
  };
  cancel: {
    onCancel(): void;
  };
  enable: {
    onEnable(): void;
  };
};

export type EditCbs = DefineCbs<Edit, Cbs>;
