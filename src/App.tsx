import { useContext, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import MainRouter from "./app/routes/MainRouter";
import { Context } from "./context/context";
import { getGames } from "./db/game/readGames";
import { Games } from "./db/utils";

function App() {
  const { setGame } = useContext(Context);
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [games, setGames] = useState<Games | null>(null);

  useEffect(() => {
    isFetching && getGames(setGames);
  }, []);

  useEffect(() => {
    isFetching && games && setIsFetching(false);
  }, [games]);

  useEffect(() => {
    if (!isFetching && games && games.length > 0) {
      const game = games.find((game) => game.isActive === true);

      if (game) {
        console.log("game found");
        console.log(game);
        setGame(game);
      }
    }
  }, [isFetching, games]);

  return (
    <BrowserRouter>
      <MainRouter />
    </BrowserRouter>
  );
}

export default App;
