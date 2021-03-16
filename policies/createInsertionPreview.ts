import { DragSourceT, Insertion } from "../Insertion";
import { findMap } from "../internal/utils";
import { getPreview } from "../lib/getPreview";
import { mapData, getf, getc, ClassMemberT } from "skandha";

export const createInsertionPreview = (
  dragSources: DragSourceT[],
  [toFacetClass, toMember]: ClassMemberT
) =>
  mapData(getf(Insertion), [toFacetClass, toMember], (insertion: Insertion) => {
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
  });
