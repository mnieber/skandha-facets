import { data, operation } from "skandha";

export class Deletion {
  static className = () => "Deletion";

  @data itemsBeingDeleted: string[] = [];

  @operation({ log: false }) setItemsBeingDeleted(itemsBeingDeleted: string[]) {
    this.itemsBeingDeleted = itemsBeingDeleted;
  }

  @operation delete(args: {
    itemIds: string[];
    moveToTrash?: boolean;
  }): Promise<any> {
    this.setItemsBeingDeleted(args.itemIds);
    return Promise.resolve(this.deleteItems(args)).finally(() => {
      this.setItemsBeingDeleted([]);
    });
  }

  protected deleteItems(args: {
    itemIds: string[];
    moveToTrash?: boolean;
  }): any {
    // Override this method in child classes
  }
}
