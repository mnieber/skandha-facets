import { DefineCbs, getCallbacks, withCbs } from 'aspiration';
import { data, operation } from 'skandha';

export class Edit {
  static className = () => 'Edit';

  @data isEditing: boolean = false;
  @data isSaving: boolean = false;

  @operation reset() {
    this.isEditing = false;
  }

  @operation({ log: false }) setIsSaving(isSaving: boolean) {
    this.isSaving = isSaving;
  }

  @operation @withCbs() save(args: { values: any }) {
    const cbs = getCallbacks(this) as EditCbs['save'];

    this.setIsSaving(true);
    return Promise.resolve(cbs.saveItem()).then((savedObj: any) => {
      this.reset();
      this.setIsSaving(false);
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
