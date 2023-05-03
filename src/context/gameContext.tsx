import { createContext, FC, useEffect, useState } from "react";
import { getGames } from "../db/game/readGames";
import { updateGame } from "../db/game/updateGame";
import { Game } from "../db/utils";
import {
  actionDefault,
  GameContextType,
  gameDefault,
  Props,
  Action,
} from "./utils";

export const GameContext = createContext<GameContextType>({
  game: undefined,
  setGame: () => {},
  gameId: 0,
  setGameId: () => {},
  action: actionDefault,
  setAction: () => {},
  timer: 0,
  setTimer: () => {},
});

export const GameContextProvider: FC<Props> = ({ children }) => {
  const [game, setGame] = useState<Game | undefined>(undefined);
  const [action, setAction] = useState<Action>(actionDefault);
  const [timer, setTimer] = useState<number>(0);
  const [gameId, setGameId] = useState<number>(0);

  useEffect(() => {
    if (game === undefined) return;
    updateGame(game, setGame);
  }, []);

  useEffect(() => {
    getGames(setGame, gameId);
  }, [gameId])
  return (
    <GameContext.Provider
      value={{ game, setGame, action, setAction, timer, setTimer, gameId, setGameId }}
    >
      {children}
    </GameContext.Provider>
  );
};
