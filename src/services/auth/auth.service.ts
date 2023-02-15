import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { createUser } from "../../db/users/create.users";
import { db } from "../config/firebase";
import { removeToken, setToken } from "../token/token.service";
import { Sign, DefaultUser } from "./utils";

export const signUp = async (userDatas: DefaultUser, setUser: Function) => {
  const auth = getAuth();
  try {
    if(userDatas.password !== undefined){
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          userDatas.email,
          userDatas.password
        );
        const { user } = userCredential;
        delete userDatas.password;
        await createUser(userDatas, user.uid);
        const userDb = await getDoc(doc(db, "users", user.uid));
        if (!userDb.exists()) throw new Error("User not found");
        const userSnap = userDb.data()
        setUser(userSnap);
        setToken(user.uid);
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const signIn = async (datas: Sign, setUser: Function) => {
  const auth = getAuth();
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      datas.email,
      datas.password
    );
    const userSnap = await getDoc(doc(db, "users", userCredential.user.uid));
    if (!userSnap.exists()) throw new Error("User not found");
    const user = userSnap.data();
    setUser(user);
    setToken(user.uid);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const logOut = async (setUser: Function) => {
  const auth = getAuth();
  try {
    await signOut(auth);
    setUser(null);
    removeToken();
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const resetPassword = async (email: string) => {
  const auth = getAuth();

  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error: any) {
    throw new Error(error.message);
  }
};
