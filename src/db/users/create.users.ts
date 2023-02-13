import { doc, setDoc } from "firebase/firestore";
import { db } from "../../services/firebase";
import { User } from "../utils";

export const createUser = async (datas: User) => {
    try {
        const userCredential = datas
        const userResponse = await setDoc(doc(db, 'users', userCredential.uid), userCredential)
        return userResponse
    } catch (error: any) {
        throw new Error(error.message)
    }
}