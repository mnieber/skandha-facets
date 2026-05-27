import { data, operation } from "skandha";

export type GenericObjectT = any;

export class Addition<T = any> {
  static className = () => "Addition";

  @data item?: T;
  @data parentId?: string;

  @operation({ log: false }) setParentId(parentId?: string) {
    this.parentId = parentId;
  }

  @operation({ log: false }) setItem(item?: T) {
    this.item = item;
  }

  @operation add(args: {
    //
    values?: GenericObjectT;
  }) {
    this.stageAdd();
    const newItem = args.values ?? this.createItem();
    this.setItem(newItem);
    this.highlightNewItem(newItem);
    return newItem;
  }

  @operation confirm() {
    const result = this.confirmAdd();
    return Promise.resolve(result).then(() => {
      this._reset();
    });
  }

  @operation cancel() {
    if (this.item) {
      const parentId = this.parentId;
      this._reset();
      this.unstageAdd(parentId);
    }
  }

  @operation({ log: false }) _reset() {
    this.setItem(undefined);
    this.setParentId(undefined);
  }

  protected stageAdd(): void {
    // Override this method in child classes if needed
  }

  protected createItem(): T | undefined {
    // Override this method in child classes if needed
    return undefined;
  }

  protected highlightNewItem(newItem: T): void {
    // Override this method in child classes if needed
  }

  protected unstageAdd(parentId: string | undefined): void {
    // Override this method in child classes if needed
  }

  protected confirmAdd(): any {
    // Override this method in child classes if needed
  }
}
