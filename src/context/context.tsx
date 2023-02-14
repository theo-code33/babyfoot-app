import { createContext, FC, useState } from "react";
import { Game } from "../db/utils";
import { ContextType, Props } from "./utils";

export const gameDefault: Game = {
  id: "",
  name: "",
  blue: [],
  red: [],
  lastActions: [],
  maxScore: 0,
  time: 0,
  isActive: false,
  code: [],
};

export const Context = createContext<ContextType>({
  game: gameDefault,
  setGame: () => {},
});

export const ContextProvider: FC<Props> = ({ children }) => {
  const [game, setGame] = useState<Game>(gameDefault);

  return (
    <Context.Provider value={{ game, setGame }}>{children}</Context.Provider>
  );
};
