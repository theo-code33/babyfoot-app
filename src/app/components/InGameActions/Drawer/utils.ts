import { Team } from "../../../../context/utils";
import {
  FoulName,
  Game,
  Poste,
  PostesName,
  UserGame,
} from "../../../../db/utils";

type SetDatasProps = {
  game: Game;
  team: Team;
  currentPoste?: string;
  gamelle?: string;
  currentPosition?: PostesName;
  foulName?: FoulName;
};

const setGamelleDatas = ({
  game,
  team,
  currentPoste,
  gamelle,
  currentPosition,
}: SetDatasProps) => {
  const otherTeam = team === "blue" ? "blue" : "red";
  return {
    ...game,
    [team]: {
      ...game[team],
      score: gamelle === "+" ? game.blue.score + 1 : game.blue.score,
      users: game[team].users?.map((user) => {
        if (user.playerPoste === currentPoste) {
          user.goals = user.goals + 1;
          user.postes?.map((poste) => {
            if (poste.name === currentPosition) {
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
        if (user.playerPoste === currentPoste) {
          user.goals = user.goals + 1;
          user.postes?.map((poste: Poste) => {
            if (poste.name === currentPosition) {
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
  currentPoste,
  foulName,
}: SetDatasProps) => {
  return {
    ...game,
    [team]: {
      ...game[team],
      users: game[team].users?.map((user) => {
        if (user.playerPoste === currentPoste) {
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
};

export { setGamelleDatas, setButDatas, setFoulsDatas };
