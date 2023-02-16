import { collection, doc, onSnapshot, setDoc } from "firebase/firestore";
import { useContext } from "react";
import { GameContext } from "../../context/gameContext";
import { db } from "../../services/config/firebase";
import { User } from "../../utils";
import { Game, Team, UserGame } from "../utils";

export const updateGamePlayer = async (user: UserGame, position: string, team: Team, gameId: number, game: Game) => {
    try {
        const updateGame = {
            ...game
        }
        if(updateGame.gameMember == "1v1"){
            updateGame[team].users = [user]
        }else if(updateGame.gameMember == "1v2" && team === "blue"){
            updateGame[team].users = [user]
        }else if(updateGame.gameMember == "2v1" && team === "red"){
            updateGame[team].users = [user]
        }else{

            const indexUserSamePosition = updateGame[team].users?.findIndex((userGame) => userGame.playerPoste === position)
            console.log('indexUserSamePosition => ', indexUserSamePosition);
            console.log('indexUserSamePosition ? => ', indexUserSamePosition !== -1);
            const indexUserWithoutPosition = updateGame[team].users?.findIndex((userGame) => userGame.playerPoste === "")
            console.log('indexUserWithoutPosition => ', indexUserWithoutPosition);
            console.log('indexUserSamePosition ? => ', indexUserWithoutPosition && indexUserWithoutPosition !== -1);
            
            if(indexUserSamePosition !== -1){
                updateGame[team].users?.filter((userGame) => userGame.playerPoste !== position)
                updateGame[team].users[indexUserSamePosition] = user
                console.log("je rentre dans le premier if");
            }else if(indexUserWithoutPosition !== -1){
                updateGame[team].users?.filter((userGame) => userGame.playerPoste !== "")
                updateGame[team].users[indexUserWithoutPosition] = user 
                console.log("je rentre dans le second if");
            }else{
                updateGame[team].users?.push(user)
                console.log("je rentre dans ta mere");
            }

        }

        console.log('updateGame => ', updateGame);
        
        const gameRef = doc(db, 'games', gameId.toString())
        const updatedGame = await setDoc(gameRef, {
            ...game,
            [team]: {
                users: updateGame[team].users
            }
        }, { merge: true })
        console.log('updated => ', updatedGame);
        
        return updatedGame

    } catch (error: any) {
        throw new Error(error.message)
    }
};

export const updateGame = async (game: Game, setGame: React.Dispatch<React.SetStateAction<Game>>) => {
    const snapRef = doc(db, 'games', game.id.toString())
    
    onSnapshot(snapRef, async (doc) => {
        setGame(doc.data() as Game)
    })
}