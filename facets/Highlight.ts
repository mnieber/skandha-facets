import { data, input, operation, output, stub } from 'skandha';

export class Highlight<T = any> {
  static className = () => 'Highlight';

  @input highlightableIds: Array<string> = stub;
  @data itemId: string | undefined;
  @output item?: T;

  @operation set(args: { itemId: string | undefined }) {
    this.onSet(args);
    this.itemId = args.itemId;
    this.scrollItemIntoView();
  }

  protected onSet(args: { itemId: string | undefined }): void {
    // Override this method in child classes if needed
  }

  protected scrollItemIntoView(): void {
    // Override this method in child classes if needed
  }
}
