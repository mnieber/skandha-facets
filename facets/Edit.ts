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

  @operation save(args: { values: any }) {
    this.setIsSaving(true);
    return Promise.resolve(this.saveItem(args)).then((savedObj: any) => {
      this.reset();
      this.setIsSaving(false);
      return savedObj;
    });
  }

  @operation cancel() {
    if (this.isEditing) {
      this.reset();
      this.onCancel();
    }
  }

  @operation enable() {
    if (!this.isEditing) {
      this.isEditing = true;
      this.onEnable();
    }
  }

  protected saveItem(args: { values: any }): any {
    // Override this method in child classes
  }

  protected onCancel(): void {
    // Override this method in child classes if needed
  }

  protected onEnable(): void {
    // Override this method in child classes if needed
  }
}
