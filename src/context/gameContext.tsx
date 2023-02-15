import { createContext, FC, useEffect, useState } from "react";
import { getGames } from "../db/game/readGames";
import { Game, Games } from "../db/utils";
import {
  actionDefault,
  GameContextType,
  gameDefault,
  Props,
  Action,
} from "./utils";

export const GameContext = createContext<GameContextType>({
  game: gameDefault,
  setGame: () => {},
  action: actionDefault,
  setAction: () => {},
});

export const GameContextProvider: FC<Props> = ({ children }) => {
  const [game, setGame] = useState<Game>(gameDefault);
  const [action, setAction] = useState<Action>(actionDefault);

  useEffect(() => {
    getGames(setGame);
  }, []);
  return (
    <GameContext.Provider value={{ game, setGame, action, setAction }}>
      {children}
    </GameContext.Provider>
  );
};
