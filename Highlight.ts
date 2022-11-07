import { getCallbacks, host } from 'aspiration';
import { data, operation, output } from 'skandha';
import { HighlightCbs } from './HighlightCbs';
export type { HighlightCbs } from './HighlightCbs';

const highlightItemDefaultCbs = (highlight: Highlight) => ({});

export class Highlight<ValueT = any> {
  static className = () => 'Highlight';

  @data id: string | undefined;
  @output item?: ValueT;

  @operation @host(['id'], highlightItemDefaultCbs) highlightItem(
    id: string | undefined
  ) {
    const cbs = getCallbacks<HighlightCbs['highlightItem']>(this);
    this.id = id;
    cbs.scrollItemIntoView && cbs.scrollItemIntoView();
  }
}
