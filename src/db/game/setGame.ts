import { collection, doc, setDoc, addDoc } from "firebase/firestore";
import { db } from "../../services/config/firebase";
import { SetDoc } from "./utils";

export const updateDoc = async ({
  newDatas,
  collectionId,
  callback,
  docId,
}: SetDoc): Promise<string|void> => {
  if (!docId) {
    const docRef = await addDoc(collection(db, collectionId), newDatas);

    return docRef.id;
  } else {
    const docRef = doc(db, collectionId, docId);
    await setDoc(docRef, newDatas, { merge: true })
      .then(() => {
        callback && callback();
      })
      .catch((err) => console.log(err));
  }
};
