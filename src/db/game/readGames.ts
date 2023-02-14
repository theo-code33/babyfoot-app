import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../services/firebase";
import { Game, Games } from "../utils";

export const getGames = async (
  setGames: React.Dispatch<React.SetStateAction<Games | null>>
): Promise<boolean> => {
  const collectionRef = collection(db, "games");

  return new Promise((resolve) => {
    onSnapshot(collectionRef, (snapshot) => {
      const dbGames: Games = [];
      snapshot.forEach((doc) => {
        dbGames.push({ ...doc.data(), id: doc.id } as Game);
      });
      console.log(dbGames);

      setGames(dbGames);
      resolve(true);
    });
  });
};
