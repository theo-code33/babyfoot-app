import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { removeToken, setToken } from "../token/token.service";
import { Sign } from "./utils";

const auth = getAuth()

export const signUp = (datas : Sign) => {
    createUserWithEmailAndPassword(auth, datas.email, datas.password)
        .then((userCredential) => {
            const user = userCredential.user;
            // setUser(user)
            setToken(user.uid)
        })
        .catch((error) => {
            const {code, message} = error;
            console.error(`Error code: ${code} - Error message: ${message}`);
        });
}

export const signIn = (datas : Sign) => {
    signInWithEmailAndPassword(auth, datas.email, datas.password)
        .then((userCredential) => {
            const user = userCredential.user;
            setUser(user)
            setToken(user.uid)
        })
        .catch((error) => {
            const {code, message} = error;
            console.error(`Error code: ${code} - Error message: ${message}`);
        });
}

export const logOut = (setUser : Function) => {
    signOut(auth)
        .then(() => {
            setUser(null)
            removeToken()
        })
        .catch((error) => {
            const {code, message} = error;
            console.error(`Error code: ${code} - Error message: ${message}`);
        });
}