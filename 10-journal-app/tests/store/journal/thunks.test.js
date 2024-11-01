import { collection, deleteDoc, getDocs } from "firebase/firestore/lite";
import {
  addNewEmptyNote,
  savingNewNote,
  setActiveNote,
  setNotes,
} from "../../../src/store/journal/journalSlice";
import {
  startLoadingNotes,
  startNewNote,
} from "../../../src/store/journal/thunks";
import { FirebaseDB } from "../../../src/firebase/config";
import { loadNotes } from "../../../src/helpers";

describe("Pruebas en Journal Thunks", () => {
  const dispatch = jest.fn();
  const getState = jest.fn();

  beforeEach(() => jest.clearAllMocks()); // Cuando usamos un mock global es necesario hacer esto

  test("startNewNote debe de crear una nueva nota en blanco", async () => {
    const uid = "TEST-UID";
    getState.mockReturnValue({ auth: { uid: uid } });

    await startNewNote()(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(savingNewNote());
    expect(dispatch).toHaveBeenCalledWith(
      addNewEmptyNote({
        body: "",
        title: "",
        id: expect.any(String),
        date: expect.any(Number),
        imageUrls: [],
      })
    );
    expect(dispatch).toHaveBeenCalledWith(
      setActiveNote({
        body: "",
        title: "",
        id: expect.any(String),
        date: expect.any(Number),
        imageUrls: [],
      })
    );

    // Borrar de firebase
    const colecctionRef = collection(FirebaseDB, `${uid}/journal/notes`);

    const docs = await getDocs(colecctionRef);

    const deletePromises = [];
    docs.forEach((doc) => deletePromises.push(deleteDoc(doc.ref)));

    await Promise.all(deletePromises);
  });

  test("startLoadingNotes", async () => {
    const uid = "TEST-UID";
    getState.mockReturnValue({ auth: { uid: uid } });

    await startNewNote()(dispatch, getState);

    const resp = await loadNotes(uid);

    await startLoadingNotes()(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(setNotes(resp));

    // Borrar de firebase
    const colecctionRef = collection(FirebaseDB, `${uid}/journal/notes`);

    const docs = await getDocs(colecctionRef);

    const deletePromises = [];
    docs.forEach((doc) => deletePromises.push(deleteDoc(doc.ref)));

    await Promise.all(deletePromises);
  });
});
