import { doc, setDoc } from "firebase/firestore";
import { db } from "../../services/config/firebase";
import { Game, GameMember, UserGame, UsersGames } from "../utils";

export const createGame = async (maxScore: number, gameMember: GameMember): Promise<Game> => {
  const idNumber1: string = Math.floor(Math.random() * 10).toString();
  const idNumber2: string = Math.floor(Math.random() * 10).toString();
  const idNumber3: string = Math.floor(Math.random() * 10).toString();
  const idNumber4: string = Math.floor(Math.random() * 10).toString();

  const id: string = `${idNumber1}${idNumber2}${idNumber3}${idNumber4}`;

  const userBlue: UsersGames = [];
  const userRed: UsersGames = [];

  const defaultUser: UserGame = {
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
  }

  const user1: UserGame = {
    ...defaultUser,
    playerNumber: 1,
    userName: "Player1"
  }

  const user2: UserGame = {
    ...defaultUser,
    playerNumber: 2,
    userName: "Player2"
  }

  const user3: UserGame = {
    ...defaultUser,
    playerNumber: 3,
    userName: "Player3"
  }

  const user4: UserGame = {
    ...defaultUser,
    playerNumber: 4,
    userName: "Player4"
  }

  if (gameMember === "1v1") {
    user1.playerPoste = "Mixte";
    userBlue.push(user1);

    user2.playerPoste = "Mixte";
    userRed.push(user2);

  } else if (gameMember === "2v2") {
    user1.playerPoste = "Attaquant";
    userBlue.push(user1);

    user2.playerPoste = "Défenseur";
    userBlue.push(user2);

    user3.playerPoste = "Attaquant";
    userRed.push(user3);

    user4.playerPoste = "Défenseur";
    userRed.push(user4);

  } else if (gameMember === "1v2") {
    user1.playerPoste = "Mixte";
    userBlue.push(user1);

    user2.playerPoste = "Attaquant";
    userRed.push(user2);

    user3.playerPoste = "Défenseur";
    userRed.push(user3);

  } else {
    user1.playerPoste = "Attaquant";
    userBlue.push(user1);

    user2.playerPoste = "Défenseur";
    userBlue.push(user2);

    user3.playerPoste = "Mixte";
    userRed.push(user3);
  }

  const newGame: Game = {
    id,
    name: `game#${id}`,
    blue: {
      score: 0,
      users: userBlue,
    },
    red: {
      score: 0,
      users: userRed,
    },
    maxScore: maxScore,
    isActive: true,
    isPlaying: false,
    code: [+id],
    gameMember: gameMember,
    currentPoint: 1,
    lastActions: [],
    time: 0,
  };

  try {
    const gameRef = doc(db, "games", id);
    await setDoc(gameRef, newGame);
    return newGame;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
