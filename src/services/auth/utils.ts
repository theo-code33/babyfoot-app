import { Fouls, Postes, Technicals } from "../../db/utils";

export type Sign = {
  email: string;
  password: string;
};
export type DefaultUser = {
  username: string;
  email: string;
  password?: string;
  goals: number;
  postes: Postes;
  fouls: Fouls;
  technicals: Technicals;
  wins: number;
  playedGames: number;
  isAdmin: boolean;
};
