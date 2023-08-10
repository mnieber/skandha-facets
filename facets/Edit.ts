import { DefineCbs, getCallbacks, withCbs } from 'aspiration';
import { data, operation } from 'skandha';

export class Edit {
  static className = () => 'Edit';

  @data isEditing: boolean = false;

  @operation reset() {
    this.isEditing = false;
  }

  @operation @withCbs() save(args: { values: any }) {
    const cbs = getCallbacks(this) as EditCbs['save'];

    return Promise.resolve(cbs.saveItem()).then((savedObj: any) => {
      this.reset();
      return savedObj;
    });
  }

  @operation @withCbs() cancel() {
    const cbs = getCallbacks(this) as EditCbs['cancel'];

    if (this.isEditing) {
      this.reset();
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
