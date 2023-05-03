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
  gameMember: "1v1",
};

export const actionDefault: Action = {
  drawerIsOpen: false,
  type: "",
  team: "red",
  postOverlay: false,
};

// TYPE
export type Action = {
  drawerIsOpen: boolean;
  type: ActionType;
  team: Team;
  postOverlay: boolean;
};

export type Team = "blue" | "red";

export type ActionType =
  | "But"
  | "Gamelle"
  | "Faute"
  | "Techniques"
  | "Demi"
  | "Swap"
  | "";

// CONTEXT TYPE
export type GameContextType = {
  game: Game | undefined;
  setGame: Dispatch<SetStateAction<Game | undefined>>;
  gameId: number;
  setGameId: Dispatch<SetStateAction<number>>;
  action: Action;
  setAction: Dispatch<SetStateAction<Action>>;
  timer: number;
  setTimer: Dispatch<SetStateAction<number>>;
};

export type UserContextType = {
  user: User | undefined;
  setUser: Dispatch<SetStateAction<User | undefined>>;
};

export type Props = {
  children: ReactNode;
};
