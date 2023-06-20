import { DragSourceT } from '../facets/Insertion';
import { findMap } from '../internal/utils';
import { getPreview } from '../lib/getPreview';

export const createInsertionPreview =
  (dragSources: DragSourceT[], ctr: any) => (inputItems: any[]) => {
    const hoverPosition = findMap((dragSource) => dragSource(ctr), dragSources);
    return hoverPosition
      ? getPreview(
          inputItems ?? [],
          hoverPosition.targetItemId,
          hoverPosition.isBefore,
          hoverPosition.payload
        )
      : inputItems ?? [];
  };
