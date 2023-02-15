import { createContext, FC, useEffect, useState } from "react";
import { getGames } from "../db/game/readGames";
import { Game, Games } from "../db/utils";
import { GameContextType, Props } from "./utils";

export const gameDefault: Game = {
  id: "",
  name: "",
  blue: {
    score: 0,
    users: [],
  },
  red: {
    score: 0,
    users: [],
  },
  lastActions: [],
  maxScore: 0,
  time: 0,
  isActive: false,
  isPlaying: false,
  currentPoint: 1,
  code: [],
};

export const GameContext = createContext<GameContextType>({
  game: gameDefault,
  setGame: () => {},
});

export const GameContextProvider: FC<Props> = ({ children }) => {
  const [game, setGame] = useState<Game>(gameDefault);

  useEffect(() => {
    getGames(setGame);
  }, []);
  return (
    <GameContext.Provider value={{ game, setGame }}>
      {children}
    </GameContext.Provider>
  );
};
