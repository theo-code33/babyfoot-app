import { useContext, useEffect } from "react";
import { GameContext } from "../../../../context/gameContext";
import { useNavigate } from "react-router-dom";

const GameStart = () => {
  const { game, setGame } = useContext(GameContext);

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/game/create");
  }

  useEffect(() => {
    if(game.id !== ""){
      navigate(`/game/${game.id}`);
    }
  }, [game])

  return (
    <div>
      <button onClick={handleNavigate}>Create game</button>
    </div>
  );
};

export default GameStart;
