import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../services/config/firebase";
import { Game, Games } from "../utils";

export const getGames = async (
  setGames: React.Dispatch<React.SetStateAction<Game | undefined>>,
  gameId: number
): Promise<boolean> => {
  const collectionRef = collection(db, "games");

  await onSnapshot(collectionRef,async (snapshot) => {
    const dbGames: Games = [];
    await snapshot.forEach((doc) => {
      dbGames.push({ ...doc.data(), id: doc.id } as Game);
    });

    const currentGame = await dbGames.find((game) => game.id === gameId.toString())
    if(!currentGame){
      setGames(undefined)
      return false
    }
    if(currentGame.isPlaying) setGames(undefined)
    else setGames(currentGame)
    return true;
  })
  return false
};
