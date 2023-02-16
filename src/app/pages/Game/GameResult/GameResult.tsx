import { useContext, useEffect } from "react";
import { GameContext } from "../../../../context/gameContext";

const GameResult = () => {
  const { game, action, setAction } = useContext(GameContext);

  useEffect(() => {
    if (game.id) {
      game.blue.users.map((user) => {
        if (user.userId != "") {
          console.log(user.userId);
        }
      });

      game.red.users.map((user) => {
        if (user.userId != "") {
          console.log(user.userId);
        }
      });
    }
  }, [game]);

  return (
    <div>
      <h1>GameResult</h1>
      <h2>Game</h2>
      <p>id: {game.id}</p>
      <div>
        <h2>Blue</h2>
        {game.blue.users.map((user) => {
          return (
            <div>
              <h2>userName: {user.userName}</h2>
              <p>goals: {user.goals}</p>
            </div>
          );
        })}
      </div>
      <div>
        <h2>Red</h2>
        {game.red.users.map((user) => {
          return (
            <div>
              <h2>userName: {user.userName}</h2>
              <p>goals: {user.goals}</p>
            </div>
          );
        })}
      </div>
      <p>maxScore: {game.maxScore}</p>
      <p>blueScore: {game.blue.score}</p>
      <p>redScore: {game.red.score}</p>
    </div>
  );
};

export default GameResult;
