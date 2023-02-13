export type Games = Game[];

export type Game = {
  id: string;
  name: string;
  players: User[];
};

export type Users = User[];

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  games: string[];
};
