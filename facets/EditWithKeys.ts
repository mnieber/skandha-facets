import { getf } from 'skandha';
import { Edit } from './Edit';

export type PropsT = {
  container: any;
};

export class EditWithKeys {
  props: PropsT;

  constructor(props: PropsT) {
    this.props = props;
  }

  handle(keyEdit: string) {
    return {
      onKeyDown: (key: string, e: any) => {
        const ctr = this.props.container;
        if (key === keyEdit) {
          e.preventDefault();
          e.stopPropagation();
          const edit = getf(Edit, ctr);
          if (edit.isEditing) {
            edit.cancel();
          } else {
            edit.enable();
          }
        }
      },
    };
  }
}
