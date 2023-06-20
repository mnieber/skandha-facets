import { DefineCbs, getCallbacks, withCbs } from 'aspiration';
import { data, operation } from 'skandha';

export class Edit {
  static className = () => 'Edit';

  @data isEditing: boolean = false;

  @operation({ log: false }) setIsEditing(isEditing: boolean) {
    this.isEditing = isEditing;
  }

  @operation @withCbs() save(args: { values: any }) {
    const cbs = getCallbacks(this) as EditCbs['save'];

    return Promise.resolve(cbs.saveItem()).then((localItem: any) => {
      this.setIsEditing(false);
      return localItem;
    });
  }

  @operation @withCbs() cancel() {
    const cbs = getCallbacks(this) as EditCbs['cancel'];

    if (this.isEditing) {
      this.setIsEditing(false);
      cbs.onCancel && cbs.onCancel();
    }
  }

  @operation @withCbs() enable() {
    const cbs = getCallbacks(this) as EditCbs['enable'];

    if (!this.isEditing) {
      this.setIsEditing(true);
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
