import { Cbs as Cbs_, host, stub } from 'aspiration';
export { getCallbacks, stub } from 'aspiration';

export const withCbs = (createDefaultCbs?: Function) =>
  host(['args'], createDefaultCbs);

export class Cbs<T extends (...args: any[]) => any> extends Cbs_ {
  args: Parameters<T>[0] = stub;
}

export type DefineCbs<T, U> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any
    ? K extends keyof U
      ? Cbs<T[K]> & U[K]
      : Cbs<T[K]>
    : never;
};
