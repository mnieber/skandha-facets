import { Cbs as Cbs_, host as host_, stub } from 'aspiration';
export { getCallbacks, stub } from 'aspiration';

export const host = (createDefaultCbs?: Function) =>
  host_(['args'], createDefaultCbs);

export class Cbs<T extends (...args: any[]) => any> extends Cbs_ {
  args: Parameters<T>[0] = stub;
}
