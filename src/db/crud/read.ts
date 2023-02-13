import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import { Game, Games, User, Users } from "../utils";

// GET ALL GAMES
export const getGames = async (
  setDbZones: React.Dispatch<React.SetStateAction<Games | null>>
): Promise<boolean> => {
  const collectionRef = collection(db, "games");

  return new Promise((resolve) => {
    onSnapshot(collectionRef, (snapshot) => {
      const dbGames: Games = [];
      snapshot.forEach((doc) => {
        dbGames.push({ ...doc.data(), id: doc.id } as Game);
      });
      setDbZones(dbGames);
      resolve(true);
    });
  });
};

// GET ALL USERS
export const getUsers = async (
  setDbUsers: React.Dispatch<React.SetStateAction<Users | null>>
): Promise<boolean> => {
  const collectionRef = collection(db, "users");

  return new Promise((resolve) => {
    onSnapshot(collectionRef, (snapshot) => {
      const dbUsers: Users = [];
      snapshot.forEach((doc) => {
        dbUsers.push({ ...doc.data(), id: doc.id } as User);
      });
      setDbUsers(dbUsers);
      resolve(true);
    });
  });
};
