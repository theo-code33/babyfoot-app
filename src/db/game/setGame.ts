import { collection, doc, setDoc, addDoc } from "firebase/firestore";
import { db } from "../../services/config/firebase";
import { SetDoc } from "./utils";

export const updateDoc = async ({
  newDatas,
  collectionId,
  callback,
  docId,
}: SetDoc) => {
  if (!docId) {
    const docRef = await addDoc(collection(db, collectionId), newDatas);

    return docRef.id;
  } else {
    const docRef = doc(db, collectionId, docId);
    console.log(newDatas);
    await setDoc(docRef, newDatas, { merge: true })
      .then(() => {
        console.log("Document successfully updated!");
        callback && callback();
      })
      .catch((err) => console.log(err));
  }
};
