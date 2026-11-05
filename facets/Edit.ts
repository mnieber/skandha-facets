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

  @operation save(args: { values: any }): Promise<any> {
    this.setIsSaving(true);
    return Promise.resolve(this.saveItem(args)).finally(() => {
      this.setIsSaving(false);
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

  // Override this method in child classes. Call reset to leave the edit mode when the item
  // has been saved.
  protected saveItem(args: { values: any }): any {}

  protected onCancel(): void {
    // Override this method in child classes if needed
  }

  protected onEnable(): void {
    // Override this method in child classes if needed
  }
}
