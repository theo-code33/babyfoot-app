import { LogLevel } from "@slack/web-api";
import { Team } from "../../../../context/utils";
import {
  FoulName,
  Game,
  Position,
  Poste,
  PostesName,
  TechnicalName,
  UserGame,
} from "../../../../db/utils";
import { logOut } from "../../../../services/auth/auth.service";

type SetDatasProps = {
  game: Game;
  team: Team;
  currentPoste?: PostesName;
  gamelle?: string;
  currentPosition?: Position;
  foulName?: FoulName;
  technicalName?: TechnicalName;
};

const setGamelleDatas = ({
  game,
  team,
  currentPoste,
  gamelle,
  currentPosition,
}: SetDatasProps) => {
  const otherTeam = team === "blue" ? "red" : "blue";
  return {
    ...game,
    [team]: {
      ...game[team],
      score: gamelle === "+" ? game[team].score + 1 : game[team].score,
      users: game[team].users?.map((user) => {
        if (user.playerPoste === currentPosition) {
          user.goals = user.goals + 1;
          user.postes?.map((poste) => {
            if (poste.name === currentPoste) {
              poste.goals = poste.goals + 1;
            }
          });
        }
        return user;
      }),
    },
    [otherTeam]: {
      ...game[otherTeam],
      score:
        gamelle === "-" ? game[otherTeam].score - 1 : game[otherTeam].score,
    },
  };
};

const setButDatas = ({
  game,
  team,
  currentPoste,
  currentPosition,
}: SetDatasProps) => {
  return {
    ...game,
    [team]: {
      ...game[team],
      score: game[team].score + game.currentPoint,
      users: game[team].users?.map((user: UserGame) => {
        if (user.playerPoste === currentPosition) {
          user.goals = user.goals + 1;
          user.postes?.map((poste: Poste) => {
            if (poste.name === currentPoste) {
              poste.goals = poste.goals + 1;
            }
          });
        }
        return user;
      }),
    },
    currentPoint: 1,
  };
};

const setFoulsDatas = ({
  game,
  team,
  foulName,
  currentPosition,
}: SetDatasProps) => {
  if (foulName === "pisette" || foulName === "rateau") {
    return {
      ...game,
      [team]: {
        ...game[team],
        score: foulName === "pisette" ? game[team].score - 1 : game[team].score,
        users: game[team].users?.map((user) => {
          if (user.playerPoste === "Attaquant") {
            user.fouls?.map((foul) => {
              if (foul.name === foulName) {
                foul.count = foul.count + 1;
              }
            });
          }
          return user;
        }),
      },
    };
  } else {
    return {
      ...game,
      [team]: {
        ...game[team],
        users: game[team].users?.map((user) => {
          if (user.playerPoste === currentPosition) {
            user.fouls?.map((foul) => {
              if (foul.name === foulName) {
                foul.count = foul.count + 1;
              }
            });
          }
          return user;
        }),
      },
    };
  }
};

const setTechnicalsDatas = ({
  game,
  team,
  currentPoste,
  currentPosition,
  technicalName,
}: SetDatasProps) => {
  console.log("currentPoste", currentPoste);
  console.log("currentPosition", currentPosition);
  console.log("technicalName", technicalName);

  return {
    ...game,
    [team]: {
      ...game[team],
      score: game[team].score + game.currentPoint,
      users: game[team].users?.map((user) => {
        if (user.playerPoste === currentPosition) {
          user.goals = user.goals + 1;
          user.postes?.map((poste) => {
            if (poste.name === currentPoste) {
              poste.goals = poste.goals + 1;
            }
          });
          user.technicals?.map((technical) => {
            if (technical.name === technicalName) {
              technical.count = technical.count + 1;
            }
          });
        }
        return user;
      }),
    },
    currentPoint: 1,
  };
};

export { setGamelleDatas, setButDatas, setFoulsDatas, setTechnicalsDatas };
