import { getCtr } from "skandha";
import { Editing } from "../Editing";

export function editingSetEnabled(facet: any) {
  const ctr = getCtr(facet);
  const editing = Editing.get(ctr);
  if (!editing.isEditing) {
    editing.enable();
  }
}

export function editingSetDisabled(facet: any) {
  const ctr = getCtr(facet);
  const editing = Editing.get(ctr);
  if (editing.isEditing) {
    editing.cancel();
  }
}
