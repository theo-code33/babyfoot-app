import { useContext, useEffect } from "react";
import { Context } from "../../../../context/context";

const GameStart = () => {
  const { game, setGame } = useContext(Context);

  useEffect(() => {
    console.log(game);
  }, []);

  return (
    <div>
      <h1>GameStart</h1>
    </div>
  );
};

export default GameStart;
