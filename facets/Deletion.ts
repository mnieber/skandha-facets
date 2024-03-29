import { withCbs, type CallbackMap } from 'aspiration';
import { data, operation } from 'skandha';

export class Deletion {
  static className = () => 'Deletion';

  callbackMap = {} as CallbackMap<{
    delete: {
      deleteItems: () => {};
    };
  }>;

  @data isDeleting: boolean = false;

  @operation({ log: false }) setIsDeleting(isDeleting: boolean) {
    this.isDeleting = isDeleting;
  }

  @operation delete(args: { itemIds: string[]; moveToTrash?: boolean }) {
    return withCbs(this.callbackMap, 'delete', args, (cbs) => {
      this.setIsDeleting(true);
      return Promise.resolve(cbs.deleteItems()).then((response: any) => {
        this.setIsDeleting(false);
        return response;
      });
    });
  }
}
