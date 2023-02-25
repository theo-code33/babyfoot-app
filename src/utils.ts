import { Position } from "./db/utils";

export type Games = Game[];

export type Game = {
  id: string;
  name: string;
  team1: Users;
  team2: Users;
};

export type Users = User[];

export type User = {
  uid?: string;
  username: string;
  email: string;
  cover?: any;
  games?: Games;
  goals?: number;
  playerPoste?: Position;
};
