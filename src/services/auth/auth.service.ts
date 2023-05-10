import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { createUser } from "../../db/users/create.users";
import { db } from "../config/firebase";
import { removeToken, addToken } from "../token/token.service";
import { Sign, DefaultUser } from "./utils";
import { User } from "../../utils";

export const signUp = async (userDatas: DefaultUser, setUser: Function): Promise<React.SetStateAction<void>> => {
  const auth = getAuth();
  try {
    if (userDatas.password !== undefined) {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        userDatas.email,
        userDatas.password,
      );
      const { user } = userCredential;
      delete userDatas.password;
      await createUser(userDatas, user.uid);
      const userDb = await getDoc(doc(db, "users", user.uid));
      if (!userDb.exists()) throw new Error("User not found");
      const userSnap = userDb.data()
      setUser(userSnap);
      addToken(user.uid);
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const signInWithGoogle = async (
  setError: React.Dispatch<React.SetStateAction<boolean>>,
  navigate: Function,
  id: string | undefined,
): Promise<React.SetStateAction<void>> => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  signInWithPopup(auth, provider)
    .then(async (result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = await result.user.getIdToken(true)
      const user = result.user;

      const queryUserDb = query(collection(db, "users"), where("email", "==", user.email));
      const userDb = await getDocs(queryUserDb);

      if (userDb.docs.length === 0 && user.displayName !== null && user.email !== null) {
        const newUser = {
          email: user.email,
          username: user.displayName,
          goals: 0,
          postes: [
            {
              name: "AG",
              goals: 0,
            },
            {
              name: "AC",
              goals: 0,
            },
            {
              name: "AD",
              goals: 0,
            },
            {
              name: "M",
              goals: 0,
            },
            {
              name: "DG",
              goals: 0,
            },
            {
              name: "DD",
              goals: 0,
            },
            {
              name: "G",
              goals: 0,
            },
          ],
          fouls: [
            {
              name: "rateau",
              count: 0,
            },
            {
              name: "pisette",
              count: 0,
            },
            {
              name: "roulette",
              count: 0,
            },
          ],
          technicals: [
            {
              name: "cendar",
              count: 0,
            },
            {
              name: "lob",
              count: 0,
            },
            {
              name: "but incroyable",
              count: 0,
            },
          ],
          wins: 0,
          playedGames: 0,
          isAdmin: false,
        }
        await createUser(newUser, user.uid);
      }
      addToken(token);
      if (id !== undefined) {
        navigate(`/game/${id}/select-player`);
      } else {
        navigate("/game");
      }

    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const credential = GoogleAuthProvider.credentialFromError(error);
      setError(true)
    });

}

export const signIn = async (datas: Sign, setUser: Function): Promise<React.SetStateAction<void>> => {
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
    const token = await userCredential.user.getIdToken(true)
    setUser(user);
    addToken(token);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const logOut = async (setUser: React.Dispatch<React.SetStateAction<User | undefined>>): Promise<React.SetStateAction<void>> => {
  const auth = getAuth();
  try {
    await signOut(auth);
    setUser(undefined);
    removeToken();
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const resetPassword = async (email: string): Promise<void> => {
  const auth = getAuth();

  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const checkUser = async (setUser: Function): Promise<React.SetStateAction<void>> => {
  getAuth().onIdTokenChanged(async (user) => {
    if (user) {
      const userSnap = await getDoc(doc(db, "users", user.uid));
      if (!userSnap.exists()) throw new Error("User not found");
      const userDb = userSnap.data();
      setUser(userDb);
    } else {
      setUser(null);
    }
  })
}
