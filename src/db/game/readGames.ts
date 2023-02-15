import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../services/config/firebase";
import { Game, Games } from "../utils";

export const getGames = async (
  setGames: React.Dispatch<React.SetStateAction<Game>>
): Promise<boolean> => {
  const collectionRef = collection(db, "games");

  await onSnapshot(collectionRef,async (snapshot) => {
    const dbGames: Games = [];
    await snapshot.forEach((doc) => {
      dbGames.push({ ...doc.data(), id: doc.id } as Game);
    });

    const gameActive = await dbGames.find((game) => game.isActive)
    if(!gameActive) return false

    setGames(gameActive);
    return true;
  })

  return false
};
