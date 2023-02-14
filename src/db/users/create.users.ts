import { doc, Firestore, setDoc } from "firebase/firestore";
import { db } from "../../services/firebase";
import { UserDb } from "./utils";


export const createUser = async (datas: UserDb) => {
    try {
        const userCredential = datas
        const docRef = doc(db, 'users', userCredential.uid)
        const userResponse = await setDoc(docRef, userCredential)
        return userResponse
    } catch (error: any) {
        const {code, message} = error;
        console.error(`Error code: ${code} - Error message: ${message}`);
    }
}