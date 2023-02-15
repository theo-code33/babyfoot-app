import { doc, setDoc } from "firebase/firestore";
import { db } from "../../services/config/firebase";
import { Game } from "../utils";

export const createGame = async (maxScore: number) => {
    const id = Math.floor(Math.random() * 10000).toString();

    const newGame = {
        id,
        name: `game#${id}`,
        blue: {
            score: 0,
        },
        red: {
            score: 0,
        },
        maxScore: maxScore,
        isActive: true,
        code: [
            +id
        ],
    } as Game

    try {
        const gameRef = doc(db, 'games', id)
        const gameResponse = await setDoc(gameRef, newGame)
        return gameResponse
    } catch (error: any) {
        throw new Error(error.message)
    }
}