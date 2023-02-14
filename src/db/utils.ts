export type Games = Game[];

export type Game = {
  id: string;
  name: string;
  blue: UsersGames;
  red: UsersGames;
  lastActions: LastActions;
  maxScore: number;
  time: number;
  isActive: boolean;
  code: number[];
};

export type UsersGames = UserGame[];

export type UserGame = {
  playerPoste: string;
  userName: "Player1" | "Player2" | string;
  playerNumber: 1 | 2 | 3 | 4;
  userId: string;
  goals: number;
  postes: Postes;
  fouls: Fouls;
  technicals: Technicals;
};

export type Fouls = Foul[];

export type Foul = {
  name: "rateau" | "pisette" | "roulette";
  count: number;
};
export type Technicals = Technical[];

export type Technical = {
  name: "cendar" | "lob" | "but incroyable";
  count: number;
};

export type Postes = Poste[];

export type Poste = {
  name: "AG" | "AC" | "AD" | "M" | "DG" | "DD" | "G";
  goals: number;
};

export type LastActions = LastAction[];

export type LastAction = {
  playerNumber: number;
  action?: string;
  time: number;
  position: string;
};

export type Users = User[];

export type User = {
  id: string;
  uid: string;
  username: string;
  password: string;
  email: string;
  cover?: string;
  goals: number;
  postes: Postes;
  fouls: Fouls;
  technicals: Technicals;
  wins: number;
  startedGames: number;
};
