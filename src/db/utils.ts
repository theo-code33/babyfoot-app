export type Games = Game[];

export type Game = {
  id: string;
  name: string;
  blue: {
    score: number;
    users: UsersGames;
  };
  red: {
    score: number;
    users: UsersGames;
  };
  lastActions: LastActions | never[];
  maxScore: number;
  time: number;
  isActive: boolean;
  isPlaying: boolean;
  currentPoint: number;
  code: number[];
  gameMember: GameMember;
};

export type Team = "blue" | "red";

export type UsersGames = UserGame[];

export type UserGame = {
  playerPoste: Position;
  userName: "Player1" | "Player2" | string;
  playerNumber?: 1 | 2 | 3 | 4;
  userId: string;
  goals: number;
  postes: Postes;
  fouls: Fouls;
  technicals: Technicals;
};

export type UpdatedUser = {
  userId: string;
  userName: string;
  playerPoste: Position;
};

export type Position = "Attaquant" | "Défenseur" | "Mixte" | "";

export type Fouls = Foul[];

export type Foul = {
  name: FoulName;
  count: number;
};

export type FoulName = "rateau" | "pisette" | "roulette" | "";

export type Technicals = Technical[];

export type Technical = {
  name: TechnicalName;
  count: number;
};

export type TechnicalName = "cendar" | "lob" | "but incroyable" | "";

export type Postes = Poste[];

export type Poste = {
  name: PostesName;
  goals: number;
};

export type PostesName = "AG" | "AC" | "AD" | "M" | "DG" | "DD" | "G";

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

export type GameMember = "1v1" | "2v2" | "1v2" | "2v1";
