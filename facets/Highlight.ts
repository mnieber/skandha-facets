import { getCallbacks, host, stub } from 'aspiration';
import { data, input, operation, output } from 'skandha';
import { HighlightCbs } from './HighlightCbs';
import {
  HighlightUIConnector,
  HighlightUIConnectorOptionsT,
} from './HighlightUIConnector';
export type { HighlightCbs } from './HighlightCbs';
export { highlightUIHandlers } from './HighlightUIConnector';
export type {
  HighlightUIConnectorOptionsT,
  HighlightUIConnectorT,
  HighlightUIPropsT,
} from './HighlightUIConnector';

const highlightItemDefaultCbs = (highlight: Highlight) => ({});

const createUIConnectorDefaultCbs = (highlight: Highlight) => ({
  createUIConnector: function (this: HighlightCbs['createUIConnector']) {
    return new HighlightUIConnector({
      highlight,
      options: this.uiConnectorOptions,
    });
  },
});

export class Highlight<ValueT = any> {
  static className = () => 'Highlight';

  @input highlightableIds: Array<string> = stub;
  @data id: string | undefined;
  @output item?: ValueT;

  @operation @host(['id'], highlightItemDefaultCbs) highlightItem(
    id: string | undefined
  ) {
    const cbs = getCallbacks<HighlightCbs['highlightItem']>(this);

    this.id = id;
    cbs.scrollItemIntoView && cbs.scrollItemIntoView();
  }

  @host(['uiConnectorOptions'], createUIConnectorDefaultCbs) createUIConnector(
    uiConnectorOptions?: HighlightUIConnectorOptionsT
  ) {
    const cbs = getCallbacks<HighlightCbs['createUIConnector']>(this);

    return cbs.createUIConnector();
  }
}
