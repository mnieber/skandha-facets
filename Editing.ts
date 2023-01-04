import { getCallbacks, host } from 'aspiration';
import { data, decorateCb, operation } from 'skandha';
import { EditingCbs } from './EditingCbs';
export type { EditingCbs } from './EditingCbs';

export class Editing {
  static className = () => 'Editing';

  @data isEditing: boolean = false;

  @operation @host(['values']) save(values: any) {
    const cbs = getCallbacks<EditingCbs['save']>(this);
    return Promise.resolve(cbs.saveItem()).then(
      decorateCb(() => {
        this.isEditing = false;
        cbs.refreshView && cbs.refreshView();
      })
    );
  }

  @operation @host cancel() {
    this.isEditing = false;
  }

  @operation @host enable() {
    this.isEditing = true;
  }
}
