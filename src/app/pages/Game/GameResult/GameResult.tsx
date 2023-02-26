import { useContext, useEffect, useState } from "react";
import { GameContext } from "../../../../context/gameContext";
import score from "../../../../assets/endGame/scoreboard.png";
import { useNavigate } from "react-router-dom";
import { getUserByUid } from "../../../../db/users/read.users";
import { updateUser } from "../../../../db/users/update.users";
import { UpdatedUser, User } from "../../../../db/utils";
import { log } from "console";

const GameResult = () => {
  const { game, action, setAction } = useContext(GameContext);
  const [topBlueScorer, setTopBlueScorer] = useState<string>("");
  const [topRedScorer, setTopRedScorer] = useState<string>("");
  const [realUserList, setRealUserList] = useState<any[]>([]);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/game/create");
  };

  useEffect(() => {
    if (game.id) {
      const topScorerBleu = game.blue.users.reduce((previous, current) => {
        return previous.goals > current.goals ? previous : current;
      });
      if (topScorerBleu.userName === "") {
        setTopBlueScorer(`Player : ${topScorerBleu.playerNumber}`);
      } else {
        setTopBlueScorer(topScorerBleu.userName);
      }
      console.log("topScorerBleu", topScorerBleu);

      const topScorerRouge = game.red.users.reduce((previous, current) => {
        return previous.goals > current.goals ? previous : current;
      });
      if (topScorerRouge.userName === "") {
        setTopRedScorer(`Player : ${topScorerRouge.playerNumber}`);
      } else {
        setTopRedScorer(topScorerRouge.userName);
      }
      console.log("topScorerRouge", topScorerRouge);
    }
  }, [game]);

  useEffect(() => {
    if (game.id) {
      game.blue.users.forEach((player) => {
        if (player.userId !== "") {
          //set l'objet player en entier
          setRealUserList((realUserList) => [...realUserList, player]);
        } else {
          console.log("non");
        }
      });
      game.red.users.forEach((player) => {
        if (player.userId !== "") {
          setRealUserList((realUserList) => [...realUserList, player]);
        } else {
          console.log("non");
        }
      });
    }
  }, [game]);

  useEffect(() => {
    console.log("realUserList", realUserList);
  }, [realUserList]);

  useEffect(() => {
    realUserList.forEach(async (user: any) => {
      let userDb = (await getUserByUid(user.userId)) as User;
      console.log("userDb", userDb.goals);

      if (userDb) {
        const goals = userDb.goals + user.goals;

        const allFouls = userDb.fouls.map((a) => {
          const b = user.fouls.find((b: any) => b.name === a.name);
          if (b) {
            return { name: a.name, count: a.count + b.count };
          } else {
            return { name: a.name, count: a.count };
          }
        });

        userDb.fouls = allFouls;

        const allPostes = userDb.postes.map((a) => {
          const b = user.postes.find((b: any) => b.name === a.name);
          if (b) {
            return { name: a.name, goals: a.goals + b.goals };
          } else {
            return { name: a.name, goals: a.goals };
          }
        });

        userDb.postes = allPostes;

        const allTechnicals = userDb.technicals.map((a) => {
          const b = user.technicals.find((b: any) => b.name === a.name);
          if (b) {
            return { name: a.name, count: a.count + b.count };
          } else {
            return { name: a.name, count: a.count };
          }
        });

        userDb.technicals = allTechnicals;

        console.log("userDb.fouls", userDb.technicals);
        console.log("user.fouls", user.technicals);

        console.log("Goals ", userDb.goals + user.goals);
        const newGoals = user.goals;
        console.log("newGoals", newGoals);

        const userUpdated = {
          ...userDb,
          goals: goals,
          wins: userDb.wins + 1,
          fouls: userDb.fouls,
          postes: userDb.postes,
          technicals: userDb.technicals,
        };

        updateUser(userUpdated);
      }
    });
  }, [realUserList]);

  const blueGoals = game.blue.users.map((user) => ({
    totalGoals: user.goals,
  }));

  const totalBlueGoals = game.blue.users.reduce(
    (sum, user) => sum + user.goals,
    0
  );

  const redGoals = game.red.users.map((user) => ({
    totalGoals: user.goals,
  }));

  const totalRedGoals = game.red.users.reduce(
    (sum, user) => sum + user.goals,
    0
  );
  const bleuPisettes = game.blue.users.map((user) => ({
    totalPisettes: user.fouls.map((foul) => {
      if (foul.name === "pisette") {
        return foul.count;
      } else {
        return 0;
      }
    }),
  }));

  const totalBleu = bleuPisettes.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.totalPisettes.reduce((a, b) => a + b, 0);
  }, 0);

  const rougePisettes = game.red.users.map((user) => ({
    totalPisettes: user.fouls.map((foul) => {
      if (foul.name === "pisette") {
        return foul.count;
      } else {
        return 0;
      }
    }),
  }));

  const totalRouge = rougePisettes.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.totalPisettes.reduce((a, b) => a + b, 0);
  }, 0);

  const bleuRoulette = game.blue.users.map((user) => ({
    totalRoulettes: user.fouls.map((foul) => {
      if (foul.name === "roulette") {
        return foul.count;
      } else {
        return 0;
      }
    }),
  }));

  const totalBleuRoulette = bleuRoulette.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.totalRoulettes.reduce((a, b) => a + b, 0);
  }, 0);

  const rougeRoulette = game.red.users.map((user) => ({
    totalRoulettes: user.fouls.map((foul) => {
      if (foul.name === "roulette") {
        return foul.count;
      } else {
        return 0;
      }
    }),
  }));

  const totalRougeRoulette = rougeRoulette.reduce(
    (accumulator, currentValue) => {
      return (
        accumulator + currentValue.totalRoulettes.reduce((a, b) => a + b, 0)
      );
    },
    0
  );
  const bleuLob = game.blue.users.map((user) => ({
    totalLob: user.technicals.map((technical) => {
      if (technical.name === "lob") {
        return technical.count;
      } else {
        return 0;
      }
    }),
  }));

  const totalBleueLob = bleuLob.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.totalLob.reduce((a, b) => a + b, 0);
  }, 0);
  const rougeLob = game.blue.users.map((user) => ({
    totalLob: user.technicals.map((technical) => {
      if (technical.name === "lob") {
        return technical.count;
      } else {
        return 0;
      }
    }),
  }));

  const totalRougeLob = rougeLob.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.totalLob.reduce((a, b) => a + b, 0);
  }, 0);

  const bleueButIncr = game.blue.users.map((user) => ({
    totalButIncr: user.technicals.map((technical) => {
      if (technical.name === "lob") {
        return technical.count;
      } else {
        return 0;
      }
    }),
  }));

  const totalBleuButIncr = bleueButIncr.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.totalButIncr.reduce((a, b) => a + b, 0);
  }, 0);

  const RougeButIncr = game.blue.users.map((user) => ({
    totalButIncr: user.technicals.map((technical) => {
      if (technical.name === "lob") {
        return technical.count;
      } else {
        return 0;
      }
    }),
  }));

  const totalRougeButIncr = RougeButIncr.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.totalButIncr.reduce((a, b) => a + b, 0);
  }, 0);

  return (
    <div className="end">
      <img className="scoreboardImg" src={score} alt="" />
      <div className="scoreboardEndGame">
        <p>{game.blue.score}</p>
        <p>{game.red.score}</p>
      </div>
      <div className="statistique">
        <h2 style={{ textAlign: "center" }}>STATISTIQUES DU MATCH</h2>
        <div className="endGameDivs">
          <p>{totalBlueGoals}</p>
          <p className="center">BUT</p>
          <p>{totalRedGoals}</p>
        </div>
        <div className="endGameDivs">
          <p>{totalBleu}</p>
          <p className="center">PISETTE</p>
          <p>{totalRouge}</p>
        </div>
        <div className="endGameDivs">
          <p>{totalBleuRoulette}</p>
          <p className="center">ROULETTE</p>
          <p>{totalRougeRoulette}</p>
        </div>
        <div className="endGameDivs">
          <p>{topBlueScorer}</p>
          <p className="center">MEILLEUR BUTEUR</p>
          <p>{topRedScorer}</p>
        </div>
        <div className="endGameDivs">
          <p>{totalBleueLob}</p>
          <p className="center">LOB</p>
          <p>{totalRougeLob}</p>
        </div>
        <div className="endGameDivs">
          <p>{totalBleuButIncr}</p>
          <p className="center">BUT INCROYABLE</p>
          <p>{totalRougeButIncr}</p>
        </div>
        <button onClick={handleClick} className="recommencer">
          RECOMMENCER
        </button>
      </div>
    </div>
  );
};

export default GameResult;
