import { DragSourceT } from '../facets/Insertion';
import { findMap } from '../internal/utils';
import { getPreview } from '../lib/getPreview';

export const insertionPreviewUsesDragSources =
  (dragSources: DragSourceT[], ctr: any) => (inputItems: any[]) => {
    const drag = findMap((dragSource) => dragSource(ctr), dragSources);
    return drag
      ? getPreview(
          inputItems ?? [],
          drag.targetItemId,
          drag.isBefore,
          drag.payload
        )
      : inputItems ?? [];
  };
