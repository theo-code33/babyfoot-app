import { useContext, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import MainRouter from "./app/routes/MainRouter";
import { Context } from "./context/context";
import { getGames } from "./db/game/readGames";
import { Games } from "./db/utils";

function App() {
  const { game, setGame } = useContext(Context);
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [games, setGames] = useState<Games | null>(null);

  useEffect(() => {
    isFetching && getGames(setGames);
  }, []);

  useEffect(() => {
    isFetching && games && setIsFetching(false);
  }, [isFetching]);

  useEffect(() => {
    console.log("la");

    if (isFetching && games) {
      console.log("ici");

      const game = games.find((game) => game.isActive === true);
      console.log(game);
      game && setGame(game);
    }
  }, [games]);

  return (
    <BrowserRouter>
      <MainRouter />
    </BrowserRouter>
  );
}

export default App;