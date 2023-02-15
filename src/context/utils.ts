import { Dispatch, ReactNode, SetStateAction } from "react";
import { Game } from "../db/utils";
import { User } from "../utils";

export type GameContextType = {
  game: Game;
  setGame: Dispatch<SetStateAction<Game>>;
};

export type UserContextType = {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
}

export type Props = {
  children: ReactNode;
};