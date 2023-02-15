import { Dispatch, ReactNode, SetStateAction } from "react";
import { Game } from "../db/utils";
import { User } from "../utils";

// CONTEXT DEFAULT
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

export const actionDefault: Action = {
  drawerIsOpen: false,
  type: "",
};

// TYPE
export type Action = {
  drawerIsOpen: boolean;
  type: ActionType;
};

export type ActionType =
  | "But"
  | "Gamelle"
  | "Faute"
  | "Geste Techniques"
  | "Demi"
  | "Swap"
  | "";

// CONTEXT TYPE
export type GameContextType = {
  game: Game;
  setGame: Dispatch<SetStateAction<Game>>;
  action: Action;
  setAction: Dispatch<SetStateAction<Action>>;
};

export type UserContextType = {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
};

export type Props = {
  children: ReactNode;
};
