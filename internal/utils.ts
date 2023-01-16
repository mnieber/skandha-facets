export function lookUp(keys: Array<any>, obj: any): Array<any> {
  return keys.map((x) => obj[x]);
}

export function range(start: number, stop: number) {
  var ans: number[] = [];
  for (let i = start; i < stop; i++) {
    ans.push(i);
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
    pickItem(allItems[idx + 1]);
    return true;
  }
  if (!isForward && idx - 1 >= 0) {
    pickItem(allItems[idx - 1]);
    return true;
  }
  return false;
}

export function findNextTabStop(
  el: any,
  isDown: boolean,
  itemSelector: string
) {
  var universe = document.querySelectorAll(itemSelector);
  var list = Array.prototype.filter.call(universe, function (item) {
    return true;
  });
  var index = list.indexOf(el);
  return isDown
    ? list[index + 1] ?? list[0]
    : list[index - 1] ?? list[list.length - 1];
}
