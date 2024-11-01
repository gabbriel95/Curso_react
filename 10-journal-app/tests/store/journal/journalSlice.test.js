import { activate } from "firebase/remote-config";
import {
  addNewEmptyNote,
  journalSlice,
  savingNewNote,
  setActiveNote,
} from "../../../src/store/journal/journalSlice";
import { demoNote, initialState } from "../../fixtures/journalFixtures";

describe("Pruebas en el journalSlice", () => {
  test("Debe de regrsar el estado inicial y debe llamarse Journal", () => {
    expect(journalSlice.name).toBe("journal");

    const state = journalSlice.reducer(initialState, {});

    expect(state).toEqual(initialState);
  });

  test("Debe de realizar savingNewNote", () => {
    const state = journalSlice.reducer(initialState, savingNewNote());

    expect(state).toEqual({
      ...initialState,
      isSaving: true,
    });
  });

  test("Debe de realizar addNewEmptyNote ", () => {
    const state = journalSlice.reducer(initialState, addNewEmptyNote(demoNote));

    expect(state.notes).toHaveLength(1);
    expect(state).toEqual({ ...initialState, notes: [demoNote] });
  });

  test("Debe de realizar setActiveNote", () => {
    const state = journalSlice.reducer(initialState, setActiveNote(true));

    expect(state.active).toBeTruthy();
  });

  /* Los demas son muy parecidos */
});
