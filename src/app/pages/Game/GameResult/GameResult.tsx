import { SetStateAction, useContext, useEffect, useState } from "react";
import { GameContext } from "../../../../context/gameContext";
import score from "../../../../assets/endGame/scoreboard.png";
import { useNavigate } from "react-router-dom";
import { getUserByUid } from "../../../../db/users/read.users";
import { updateUser } from "../../../../db/users/update.users";
import { UpdatedUser, User, UserGame } from "../../../../db/utils";
import { Team } from "../../../../context/utils";

const GameResult = () => {
  const { game } = useContext(GameContext);
  const [topBlueScorer, setTopBlueScorer] = useState<string>("");
  const [topRedScorer, setTopRedScorer] = useState<string>("");
  const [realUserList, setRealUserList] = useState<UserGame[]>([]);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/game/create");
  };

  const setBestScorer = (color: Team) : void => {
    const topScorer = game[color].users.reduce((previous, current) => {
      return previous.goals > current.goals ? previous : current;
    });
    const playerName =
      topScorer.userName === ""
        ? `Player : ${topScorer.playerNumber}`
        : topScorer.userName;
    if (color === "blue") {
      setTopBlueScorer(playerName);
    } else {
      setTopRedScorer(playerName);
    }
  };

  const getConnectedUser = (color: Team): void => {
    const usersConnected = game[color].users.filter(
      (user) => user.userId !== ""
    );
    setRealUserList((realUserList) => [...realUserList, ...usersConnected]);
  };

  const totalGoals = (color: Team): number => {
    return game[color].users.reduce((previous, current) => {
      return previous + current.goals;
    }, 0);
  };

  const colorPisettes = (color: Team): number => {
    return game[color].users.reduce((previous, current) => {
      const pisettes = current.fouls.find((foul) => foul.name === "pisette");
      if (pisettes) {
        return previous + pisettes.count;
      } else {
        return previous;
      }
    }, 0);
  };

  const colorRoulettes = (color: Team): number => {
    return game[color].users.reduce((previous, current) => {
      const roulettes = current.fouls.find((foul) => foul.name === "roulette");
      if (roulettes) {
        return previous + roulettes.count;
      } else {
        return previous;
      }
    }, 0);
  };

  const colorLob = (color: Team): number => {
    return game[color].users.reduce((previous, current) => {
      const lob = current.technicals.find(
        (technical) => technical.name === "lob"
      );
      if (lob) {
        return previous + lob.count;
      } else {
        return previous;
      }
    }, 0);
  };

  const colorButIncroyable = (color: Team): number => {
    return game[color].users.reduce((previous, current) => {
      const butIncroyable = current.technicals.find(
        (technical) => technical.name === "but incroyable"
      );
      if (butIncroyable) {
        return previous + butIncroyable.count;
      } else {
        return previous;
      }
    }, 0);
  };

  useEffect(() => {
    if (game.id) {
      setBestScorer("blue");
      setBestScorer("red");

      getConnectedUser("blue");
      getConnectedUser("red");

      totalGoals("red");
      totalGoals("blue");

      colorPisettes("red");
      colorPisettes("blue");

      colorRoulettes("red");
      colorRoulettes("blue");

      colorLob("red");
      colorLob("blue");

      colorButIncroyable("red");
      colorButIncroyable("blue");
    }
  }, [game]);

  useEffect(() => {
    realUserList.forEach(async (userPlayer: any) => {
      let userDb = (await getUserByUid(userPlayer.userId)) as User;

      if (userDb) {
        const goals = userDb.goals + userPlayer.goals;

        const allFouls = userDb.fouls.map((foulDb) => {
          const userFouls = userPlayer.fouls.find((foul: any) => foul.name === foulDb.name);
          if (userFouls) {
            return { name: foulDb.name, count: foulDb.count + userFouls.count };
          } else {
            return { name: foulDb.name, count: foulDb.count };
          }
        });

        userDb.fouls = allFouls;

        const allPostes = userDb.postes.map((posteDb) => {
          const userPostes = userPlayer.postes.find((poste: any) => poste.name === posteDb.name);
          if (userPostes) {
            return { name: posteDb.name, goals: posteDb.goals + userPostes.goals };
          } else {
            return { name: posteDb.name, goals: posteDb.goals };
          }
        });

        userDb.postes = allPostes;

        const allTechnicals = userDb.technicals.map((technicalDb) => {
          const userTechnicals = userPlayer.technicals.find((technical: any) => technical.name === technicalDb.name);
          if (userTechnicals) {
            return { name: technicalDb.name, count: technicalDb.count + userTechnicals.count };
          } else {
            return { name: technicalDb.name, count: technicalDb.count };
          }
        });

        userDb.technicals = allTechnicals;

        const newGoals = userPlayer.goals;

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
          {/* <p>{totalBlueGoals}</p> */}
          <p className="center">BUT</p>
          {/* <p>{totalRedGoals}</p> */}
        </div>
        <div className="endGameDivs">
          {/* <p>{totalBleu}</p> */}
          <p className="center">PISETTE</p>
          {/* <p>{totalRouge}</p> */}
        </div>
        <div className="endGameDivs">
          {/* <p>{totalBleuRoulette}</p> */}
          <p className="center">ROULETTE</p>
          {/* <p>{totalRougeRoulette}</p> */}
        </div>
        <div className="endGameDivs">
          <p>{topBlueScorer}</p>
          <p className="center">MEILLEUR BUTEUR</p>
          <p>{topRedScorer}</p>
        </div>
        <div className="endGameDivs">
          {/* <p>{totalBleueLob}</p> */}
          <p className="center">LOB</p>
          {/* <p>{totalRougeLob}</p> */}
        </div>
        <div className="endGameDivs">
          {/* <p>{totalBleuButIncr}</p> */}
          <p className="center">BUT INCROYABLE</p>
          {/* <p>{totalRougeButIncr}</p> */}
        </div>
        <button onClick={handleClick} className="recommencer">
          RECOMMENCER
        </button>
      </div>
    </div>
  );
};

export default GameResult;
