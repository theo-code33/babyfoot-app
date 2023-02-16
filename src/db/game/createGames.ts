import { doc, setDoc } from "firebase/firestore";
import { db } from "../../services/config/firebase";
import { Game, GameMember, UserGame, UsersGames } from "../utils";

export const createGame = async (maxScore: number, gameMember: GameMember) => {
    const id = Math.floor(Math.random() * 10000).toString();

    const userBlue : UsersGames = []
    const userRed : UsersGames = []

    const defaultUser = {
        playerPoste: "",
        userName: "",
        playerNumber: 1,
        userId: "",
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
                name: "DC",
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
                name: "cendar",
                count: 0,
            },
            {
                name: "cendar",
                count: 0,
            },
        ],
    } as UserGame

    if(gameMember === "1v1"){
        const user1 = {
            ...defaultUser
        }
        user1.playerNumber = 1
        user1.userName = "Player1"
        user1.playerPoste = "Mixte"
        userBlue.push(user1)
        const user2 = {
            ...defaultUser
        }
        user2.playerNumber = 2
        user2.userName = "Player2"
        user2.playerPoste = "Mixte"
        userRed.push(user2)
    }else if(gameMember === "2v2"){
        const user1 = {
            ...defaultUser
        }
        user1.playerNumber = 1
        user1.userName = "Player1"
        user1.playerPoste = "Attaquant"
        userBlue.push(user1)
        const user2 = {
            ...defaultUser
        }
        user2.playerNumber = 2
        user2.userName = "Player2"
        user2.playerPoste = "Défenseur"
        userBlue.push(user2)
        const user3 = {
            ...defaultUser
        }
        user3.playerNumber = 3
        user3.userName = "Player3"
        user3.playerPoste = "Attaquant"
        userRed.push(user3)
        const user4 = {
            ...defaultUser
        }
        user4.playerNumber = 4
        user4.userName = "Player4"
        user4.playerPoste = "Défenseur"
        userRed.push(user4)
    }else if(gameMember === "1v2"){
        const user1 = {
            ...defaultUser
        }
        user1.playerNumber = 1
        user1.userName = "Player1"
        user1.playerPoste = "Mixte"
        userBlue.push(user1)
        const user2 = {
            ...defaultUser
        }
        user2.playerNumber = 2
        user2.userName = "Player2"
        user2.playerPoste = "Attaquant"
        userRed.push(user2)
        const user3 = {
            ...defaultUser
        }
        user3.playerNumber = 3
        user3.userName = "Player3"
        user3.playerPoste = "Défenseur"
        userRed.push(user3)
    }else{
        const user1 = {
            ...defaultUser
        }
        user1.playerNumber = 1
        user1.userName = "Player1"
        user1.playerPoste = "Attaquant"
        userBlue.push(user1)
        const user2 = {
            ...defaultUser
        }
        user2.playerNumber = 2
        user2.userName = "Player2"
        user2.playerPoste = "Défenseur"
        userBlue.push(user2)
        const user3 = {
            ...defaultUser
        }
        user3.playerNumber = 3
        user3.userName = "Player3"
        user3.playerPoste = "Mixte"
        userRed.push(user3)
    }

    const newGame = {
        id,
        name: `game#${id}`,
        blue: {
            score: 0,
            users: userBlue
        },
        red: {
            score: 0,
            users: userRed
        },
        maxScore: maxScore,
        isActive: true,
        code: [
            +id
        ],
        gameMember: gameMember,
        currentPoint: 1,
        lastActions: [],
    } as Game

  try {
    const gameRef = doc(db, "games", id);
    await setDoc(gameRef, newGame);
    return newGame;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
