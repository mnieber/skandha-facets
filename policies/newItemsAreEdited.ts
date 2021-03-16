import { getf, getc } from "skandha";
import { Editing } from "../Editing";

export function editingSetEnabled(facet: any) {
  const ctr = getc(facet);
  const editing = getf(Editing, ctr);
  if (!editing.isEditing) {
    editing.enable();
  }
}

export function editingSetDisabled(facet: any) {
  const ctr = getc(facet);
  const editing = getf(Editing, ctr);
  if (editing.isEditing) {
    editing.cancel();
  }
}
