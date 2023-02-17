import { useContext, useEffect, useState } from "react";
import "./styles/main.scss";
import { BrowserRouter } from "react-router-dom";
import MainRouter from "./app/routes/MainRouter";
import { GameContext } from "./context/gameContext";
import { getGames } from "./db/game/readGames";
import { updateDoc } from "./db/game/setGame";
import { Games } from "./db/utils";

function App() {
  // const { setGame } = useContext(GameContext);
  // const [isFetching, setIsFetching] = useState<boolean>(true);
  // const [games, setGames] = useState<Games | null>(null);

  // const gameDefault = {
  //   id: "kdniUnglQAtDDQERnsua",
  //   name: "testGame",
  //   blue: {
  //     score: 0,
  //     users: [
  //       {
  //         playerPoste: "Attaquant",
  //         userName: "Player 1",
  //         playerNumber: 1,
  //         userId: "sdasdasdasada",
  //         goals: 7,
  //         postes: [
  //           {
  //             name: "AG",
  //             goals: 1,
  //           },
  //           {
  //             name: "AC",
  //             goals: 0,
  //           },
  //           {
  //             name: "AD",
  //             goals: 0,
  //           },
  //           {
  //             name: "M",
  //             goals: 0,
  //           },
  //           {
  //             name: "DG",
  //             goals: 1,
  //           },
  //           {
  //             name: "DC",
  //             goals: 1,
  //           },
  //           {
  //             name: "DD",
  //             goals: 0,
  //           },
  //           {
  //             name: "G",
  //             goals: 0,
  //           },
  //         ],
  //         fouls: [
  //           {
  //             name: "rateau",
  //             count: 0,
  //           },
  //           {
  //             name: "pisette",
  //             count: 0,
  //           },
  //           {
  //             name: "roulette",
  //             count: 0,
  //           },
  //         ],
  //         technicals: [
  //           {
  //             name: "cendar",
  //             count: 0,
  //           },
  //           {
  //             name: "lob",
  //             count: 0,
  //           },
  //           {
  //             name: "but incroyable",
  //             count: 0,
  //           },
  //         ],
  //       },
  //       {
  //         playerPoste: "Défenseur",
  //         userName: "Player 2",
  //         playerNumber: 2,
  //         userId: "",
  //         goals: 7,
  //         postes: [
  //           {
  //             name: "AG",
  //             goals: 1,
  //           },
  //           {
  //             name: "AC",
  //             goals: 0,
  //           },
  //           {
  //             name: "AD",
  //             goals: 0,
  //           },
  //           {
  //             name: "M",
  //             goals: 0,
  //           },
  //           {
  //             name: "DG",
  //             goals: 1,
  //           },
  //           {
  //             name: "DC",
  //             goals: 1,
  //           },
  //           {
  //             name: "DD",
  //             goals: 0,
  //           },
  //           {
  //             name: "G",
  //             goals: 0,
  //           },
  //         ],
  //         fouls: [
  //           {
  //             name: "rateau",
  //             count: 0,
  //           },
  //           {
  //             name: "pisette",
  //             count: 0,
  //           },
  //           {
  //             name: "roulette",
  //             count: 0,
  //           },
  //         ],
  //         technicals: [
  //           {
  //             name: "cendar",
  //             count: 0,
  //           },
  //           {
  //             name: "lob",
  //             count: 0,
  //           },
  //           {
  //             name: "but incroyable",
  //             count: 0,
  //           },
  //         ],
  //       },
  //     ],
  //   },
  //   red: {
  //     score: 0,
  //     users: [
  //       {
  //         playerPoste: "Attaquant",
  //         userName: "Player 3",
  //         playerNumber: 3,
  //         userId: "",
  //         goals: 7,
  //         postes: [
  //           {
  //             name: "AG",
  //             goals: 1,
  //           },
  //           {
  //             name: "AC",
  //             goals: 0,
  //           },
  //           {
  //             name: "AD",
  //             goals: 0,
  //           },
  //           {
  //             name: "M",
  //             goals: 0,
  //           },
  //           {
  //             name: "DG",
  //             goals: 1,
  //           },
  //           {
  //             name: "DC",
  //             goals: 1,
  //           },
  //           {
  //             name: "DD",
  //             goals: 0,
  //           },
  //           {
  //             name: "G",
  //             goals: 0,
  //           },
  //         ],
  //         fouls: [
  //           {
  //             name: "rateau",
  //             count: 0,
  //           },
  //           {
  //             name: "pisette",
  //             count: 0,
  //           },
  //           {
  //             name: "roulette",
  //             count: 0,
  //           },
  //         ],
  //         technicals: [
  //           {
  //             name: "cendar",
  //             count: 0,
  //           },
  //           {
  //             name: "lob",
  //             count: 0,
  //           },
  //           {
  //             name: "but incroyable",
  //             count: 0,
  //           },
  //         ],
  //       },
  //       {
  //         playerPoste: "Défenseur",
  //         userName: "Player 4",
  //         playerNumber: 4,
  //         userId: "",
  //         goals: 7,
  //         postes: [
  //           {
  //             name: "AG",
  //             goals: 1,
  //           },
  //           {
  //             name: "AC",
  //             goals: 0,
  //           },
  //           {
  //             name: "AD",
  //             goals: 0,
  //           },
  //           {
  //             name: "M",
  //             goals: 0,
  //           },
  //           {
  //             name: "DG",
  //             goals: 1,
  //           },
  //           {
  //             name: "DC",
  //             goals: 1,
  //           },
  //           {
  //             name: "DD",
  //             goals: 0,
  //           },
  //           {
  //             name: "G",
  //             goals: 0,
  //           },
  //         ],
  //         fouls: [
  //           {
  //             name: "rateau",
  //             count: 0,
  //           },
  //           {
  //             name: "pisette",
  //             count: 0,
  //           },
  //           {
  //             name: "roulette",
  //             count: 0,
  //           },
  //         ],
  //         technicals: [
  //           {
  //             name: "cendar",
  //             count: 0,
  //           },
  //           {
  //             name: "lob",
  //             count: 0,
  //           },
  //           {
  //             name: "but incroyable",
  //             count: 0,
  //           },
  //         ],
  //       },
  //     ],
  //   },
  //   lastActions: [],
  //   maxScore: 0,
  //   time: 0,
  //   isActive: false,
  //   code: [],
  // };

  // useEffect(() => {
  // isFetching && getGames(setGame);
  // updateDoc({
  //   newDatas: gameDefault,
  //   collectionId: "games",
  //   docId: "kdniUnglQAtDDQERnsua",
  // });
  // }, []);

  // useEffect(() => {
  //   isFetching && games && setIsFetching(false);
  // }, [games]);

  // useEffect(() => {
  //   if (!isFetching && games && games.length > 0) {
  //     const game = games.find((game) => game.isActive === true);

  //     if (game) {
  //       setGame(game);
  //     }
  //   }
  // }, [isFetching, games]);

  return (
    <BrowserRouter>
      <MainRouter />
    </BrowserRouter>
  );
}

export default App;
