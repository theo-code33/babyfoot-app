import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../../services/config/firebase";
import { User } from "../../utils";


export const createUser = async (datas: User, uid: string) => {
    try {

        if(datas.cover !== ''){
            const coverRef = ref(storage, `covers/users/${uid}`)
            const uploadCover = await uploadBytes(coverRef, datas.cover) as any
            await getDownloadURL(coverRef).then((downloadURL) => {
                datas.cover = downloadURL
            });
        }

        const docRef = doc(db, 'users', uid)
        const userResponse = await setDoc(docRef, datas)
        return userResponse
    } catch (error: any) {
        const {code, message} = error;
        console.error(`Error code: ${code} - Error message: ${message}`);
    }
}