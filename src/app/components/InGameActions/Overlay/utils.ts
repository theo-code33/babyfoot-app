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

  const user = game[team].users.find(
    (user) =>
      user.playerPoste === currentPosition || user.playerPoste === "Mixte"
  );

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
    lastActions: [
      ...game.lastActions,
      {
        playerNumber: user?.playerNumber,
        action: "gamelle",
        position: currentPoste,
        time: new Date().getTime(),
      },
    ],
  };
};

const setButDatas = ({
  game,
  team,
  currentPoste,
  currentPosition,
}: SetDatasProps) => {
  const user = game[team].users.find(
    (user) =>
      user.playerPoste === currentPosition || user.playerPoste === "Mixte"
  );

  return {
    ...game,
    [team]: {
      ...game[team],
      score: game[team].score + game.currentPoint,
      users: game[team].users?.map((user: UserGame) => {
        if (
          user.playerPoste === currentPosition ||
          user.playerPoste === "Mixte"
        ) {
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
    lastActions: [
      ...game.lastActions,
      {
        playerNumber: user?.playerNumber,
        action: "but",
        position: currentPoste,
        time: new Date().getTime(),
      },
    ],
  };
};

const setFoulsDatas = ({
  game,
  team,
  foulName,
  currentPosition,
  currentPoste,
}: SetDatasProps) => {
  // const user = game[team].users.find(
  //   (user) => user.playerPoste === "Attaquant" || user.playerPoste === "Mixte"
  // );

  // console.log(user);

  if (foulName === "pisette" || foulName === "rateau") {
    const user = game[team].users.find(
      (user) => user.playerPoste === "Attaquant" || user.playerPoste === "Mixte"
    );
    console.log("yooooooo");

    return {
      ...game,
      [team]: {
        ...game[team],
        score: foulName === "pisette" ? game[team].score - 1 : game[team].score,
        users: game[team].users?.map((user) => {
          if (
            user.playerPoste === "Attaquant" ||
            user.playerPoste === "Mixte"
          ) {
            user.fouls?.map((foul) => {
              if (foul.name === foulName) {
                foul.count = foul.count + 1;
              }
            });
          }
          return user;
        }),
      },
      lastActions: [
        ...game.lastActions,
        {
          playerNumber: user?.playerNumber,
          action: foulName,
          position: currentPosition,
          time: new Date().getTime(),
        },
      ],
    };
  } else {
    const user = game[team].users.find(
      (user) =>
        user.playerPoste === currentPosition || user.playerPoste === "Mixte"
    );
    console.log(currentPosition);
    if (user?.playerPoste === "Mixte") {
      console.log("mixte");
    }
    return {
      ...game,
      [team]: {
        ...game[team],
        users: game[team].users?.map((user) => {
          if (
            user.playerPoste === currentPosition ||
            user.playerPoste === "Mixte"
          ) {
            user.fouls?.map((foul) => {
              if (foul.name === foulName) {
                foul.count = foul.count + 1;
              }
            });
          }
          return user;
        }),
      },
      lastActions: [
        ...game.lastActions,
        {
          playerNumber: user?.playerNumber,
          action: foulName,
          position: currentPosition,
          time: new Date().getTime(),
        },
      ],
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
  const user = game[team].users.find(
    (user) =>
      user.playerPoste === currentPosition || user.playerPoste === "Mixte"
  );

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
    lastActions: [
      ...game.lastActions,
      {
        playerNumber: user?.playerNumber,
        action: technicalName,
        position: currentPoste,
        time: new Date().getTime(),
      },
    ],
  };
};

const newActions = (
  action: string,
  playerNumber: number,
  position: PostesName,
  game: Game
) => {
  return {
    ...game,
    lastActions: [
      ...game.lastActions,
      {
        action,
        playerNumber,
        position,
        time: new Date().getTime(),
      },
    ],
  };
};

export {
  setGamelleDatas,
  setButDatas,
  setFoulsDatas,
  setTechnicalsDatas,
  newActions,
};
