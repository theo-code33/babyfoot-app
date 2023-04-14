import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "../../services/config/firebase";
import { Game, Team, UpdatedUser } from "../utils";

export const updateGamePlayer = async (user: UpdatedUser, position: string, team: Team, gameId: number, game: Game): Promise<void> => {
    try {
        const updateGame = {
            ...game
        }

        const userIsInGame = game[team].users?.find((userGame) => userGame.userId === user.userId)
        if(userIsInGame){
            const indexUser = game[team].users?.findIndex((userGame) => userGame.userId === user.userId)
            
            updateGame[team].users[indexUser].userId = ""
            updateGame[team].users[indexUser].userName = ""
            updateGame[team].users?.map((userGame) => {
                if(userGame.playerPoste === position){
                    userGame.userId = user.userId
                    userGame.userName = user.userName
                }
            })
            const gameRef = doc(db, 'games', gameId.toString())
            await setDoc(gameRef, updateGame, { merge: true })
            return
        }

        if(team === "blue"){
            const indexUser = game["red"].users?.findIndex((userGame) => userGame.userId === user.userId)
            if(indexUser !== -1){
                updateGame["red"].users[indexUser].userId = ""
                updateGame["red"].users[indexUser].userName = ""
            }
        }else if(team === "red"){
            const indexUser = game["blue"].users?.findIndex((userGame) => userGame.userId === user.userId)
            if(indexUser !== -1){
                updateGame["blue"].users[indexUser].userId = ""
                updateGame["blue"].users[indexUser].userName = ""
            }
        }

        if(updateGame.gameMember == "1v1"){
            updateGame[team].users[0].userId = user.userId
            updateGame[team].users[0].userName = user.userName
        }else if(updateGame.gameMember == "1v2" && team === "blue"){
            updateGame[team].users[0].userId = user.userId
            updateGame[team].users[0].userName = user.userName
        }else if(updateGame.gameMember == "2v1" && team === "red"){
            updateGame[team].users[0].userId = user.userId
            updateGame[team].users[0].userName = user.userName
        }else{
            const indexUserSamePosition = updateGame[team].users?.findIndex((userGame) => userGame.playerPoste === position)
            const indexUserWithoutPosition = updateGame[team].users?.findIndex((userGame) => userGame.playerPoste === "")
            
            if(indexUserSamePosition !== -1){
                updateGame[team].users?.filter((userGame) => userGame.playerPoste !== position)
                updateGame[team].users[indexUserSamePosition].userId = ""
                updateGame[team].users[indexUserSamePosition].userName = ""
                updateGame[team].users?.map(userGame => {
                    if(userGame.playerPoste === position){
                        userGame.userId = user.userId
                        userGame.userName = user.userName
                    }
                })
            }else if(indexUserWithoutPosition !== -1){
                updateGame[team].users?.filter((userGame) => userGame.playerPoste !== "")
                updateGame[team].users[indexUserWithoutPosition].userId = ""
                updateGame[team].users[indexUserWithoutPosition].userName = ""
                updateGame[team].users?.map(userGame => {
                    if(userGame.playerPoste === position){
                        userGame.userId = user.userId
                        userGame.userName = user.userName
                    }
                })
                
            }else{
                updateGame[team].users?.map((userGame) => {
                    if(userGame.userId === "" && userGame.playerPoste === position){
                        userGame.userId = user.userId
                        userGame.userName = user.userName
                    }
                })
            }

        }

        const gameRef = doc(db, 'games', gameId.toString())
        const updatedGame = await setDoc(gameRef, {
            ...game,
            [team]: {
                users: updateGame[team].users
            }
        }, { merge: true })
        return updatedGame

    } catch (error: any) {
        throw new Error(error.message)
    }
};

export const updateGame = async (game: Game, setGame: React.Dispatch<React.SetStateAction<Game>>): Promise<React.SetStateAction<void>> => {
    const snapRef = doc(db, 'games', game.id.toString())
    
    await onSnapshot(snapRef, async (doc) => {
        setGame(doc.data() as Game)
    })
}

export const updateGameStatus = async (game: Game, status: boolean): Promise<void> => {
    try {
        const gameRef = doc(db, 'games', game.id.toString())
        await setDoc(gameRef, {
            ...game,
            isPlaying: status
        }, { merge: true })
    } catch (error: any) {
        throw new Error(error.message)
    }
}