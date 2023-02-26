import { doc, setDoc } from "firebase/firestore";
import { db } from "../../services/config/firebase";
import { User } from "../utils";

export const updateUser = async (user: User) => {
  try {
    const userRef = doc(db, "users", user.uid);
    await setDoc(userRef, user, { merge: true });
  } catch (error) {
    console.log(error);
  }
};
