import { Dispatch, ReactNode, SetStateAction } from "react";
import { Game } from "../db/utils";

export type ContextType = {
  game: Game;
  setGame: Dispatch<SetStateAction<Game>>;
};

export type Props = {
  children: ReactNode;
};
