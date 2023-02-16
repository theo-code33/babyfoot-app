import { doc, getDoc } from "firebase/firestore";
import { db } from "../../services/config/firebase";
import { User } from "../utils";

export const getUserByUid = async (uid: string) : Promise<User | boolean> => {
    const docRef = doc(db, 'users', uid)
    const docSnap = await getDoc(docRef)
    if(!docSnap.exists()) return false
    return docSnap.data() as User;
}