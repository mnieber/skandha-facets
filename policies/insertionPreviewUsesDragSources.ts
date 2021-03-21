import { DragSourceT, Insertion } from "../Insertion";
import { findMap } from "../internal/utils";
import { getPreview } from "../lib/getPreview";
import { mapDataToFacet, getf, getc } from "skandha";

export const insertionPreviewUsesDragSources = (dragSources: DragSourceT[]) =>
  mapDataToFacet(
    getf(Insertion),
    [Insertion, "preview"],
    (insertion: Insertion) => {
      const ctr = getc(insertion);
      const drag = findMap((dragSource) => dragSource(ctr), dragSources);
      const inputItems = insertion.inputItems;
      const preview = drag
        ? getPreview(
            inputItems ?? [],
            drag.targetItemId,
            drag.isBefore,
            drag.payload
          )
        : inputItems ?? [];
      return preview;
    }
  );
