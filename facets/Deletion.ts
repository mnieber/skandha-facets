import { data, operation } from 'skandha';

export class Deletion {
  static className = () => 'Deletion';

  @data isDeleting: boolean = false;

  @operation({ log: false }) setIsDeleting(isDeleting: boolean) {
    this.isDeleting = isDeleting;
  }

  @operation delete(args: { itemIds: string[]; moveToTrash?: boolean }) {
    this.setIsDeleting(true);
    return Promise.resolve(this.deleteItems(args)).then((response: any) => {
      this.setIsDeleting(false);
      return response;
    });
  }

  protected deleteItems(args: { itemIds: string[]; moveToTrash?: boolean }): any {
    // Override this method in child classes
  }
}
