import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase/config";

export const loadNotes = async (uid) => {
  const notesSnap = await getDocs(
    query(collection(db, `${uid}/journal/notes`), orderBy("date", "desc"))
  );

  const notes = [];

  notesSnap.forEach((snapSon) => {
    notes.push({
      id: snapSon.id,
      ...snapSon.data(),
    });
  });

  return notes;
};
