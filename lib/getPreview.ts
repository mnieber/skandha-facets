export const topOfTheList = "<topOfTheList>";

export function getPreview(
  items: Array<any>,
  targetItemId: any,
  isBefore: boolean,
  payload: Array<any>
): Array<any> {
  const maybeTargetItemId =
    targetItemId == topOfTheList ? undefined : targetItemId;
  return !payload.length
    ? items
    : items.reduce(
        (acc, item) => {
          if (item.id === maybeTargetItemId && isBefore) {
            acc.push(...payload);
          }
          if (!payload.find((x) => x.id === item.id)) {
            acc.push(item);
          }
          if (item.id === maybeTargetItemId && !isBefore) {
            acc.push(...payload);
          }
          return acc;
        },
        maybeTargetItemId ? [] : [...payload]
      );
}
