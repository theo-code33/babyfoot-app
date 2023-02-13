export type Games = Game[];

export type Game = {
  id: string;
  name: string;
  team1: Users;
  team2: Users;
};

export type Users = User[];

export type User = {
  id: string;
  username: string;
  email: string;
  cover: string;
  games: Games;
  goals: number;
};
