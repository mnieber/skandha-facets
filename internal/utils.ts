export function lookUp(keys: Array<any>, obj: any): Array<any> {
  return keys.map((x) => obj[x]);
}

export function range(start: number, stop: number) {
  var ans: number[] = [];
  if (stop >= start) {
    for (let i = start; i <= stop; i++) {
      ans.push(i);
    }
  } else {
    for (let i = start; i >= stop; i--) {
      ans.push(i);
    }
  }
  return ans;
}

export const findMap = (f: Function, items: any[]) => {
  for (var item of items) {
    const mapped = f(item);
    if (mapped) {
      return mapped;
    }
  }
  return undefined;
};

export function isBefore(e: any): boolean {
  const boundingRect = e.target.getBoundingClientRect();
  const height = boundingRect.bottom - boundingRect.top;
  const isBefore = e.clientY - boundingRect.top < 0.5 * height;
  return isBefore;
}

export function pickNeighbour(
  allItems: Array<any>,
  pickedItem: any,
  isForward: boolean,
  pickItem: (x: any) => void
) {
  const idx = allItems.findIndex((x) => x === pickedItem);

  if (isForward && idx + 1 < allItems.length) {
    const item = allItems[idx + 1];
    pickItem(item);
    return item;
  }
  if (!isForward && idx - 1 >= 0) {
    const item = allItems[idx - 1];
    pickItem(item);
    return item;
  }
  return allItems[idx];
}

export function listToItemById<T = any>(
  qsList: Array<T>,
  key: string = 'id'
): { [id: string]: T } {
  const result: { [id: string]: T } = {};
  qsList.forEach((item) => {
    result[item[key]] = item;
  });
  return result;
}
