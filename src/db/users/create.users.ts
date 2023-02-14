import { doc, Firestore, setDoc } from "firebase/firestore";
import { db } from "../../services/firebase";
import { User } from "../../utils";


export const createUser = async (datas: User, uid: string) => {
    try {
        const docRef = doc(db, 'users', uid)
        const userResponse = await setDoc(docRef, datas)
        return userResponse
    } catch (error: any) {
        const {code, message} = error;
        console.error(`Error code: ${code} - Error message: ${message}`);
    }
}