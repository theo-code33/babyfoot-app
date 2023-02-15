import { useContext } from "react";
import { GameContext } from "../../../../context/gameContext";
import { updateDoc } from "../../../../db/game/setGame";

const Demi = () => {
  const { game } = useContext(GameContext);

  const handlClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    updateDoc({
      newDatas: {
        ...game,
        currentPoint: game.currentPoint + 1,
      },
      collectionId: "games",
      docId: game.id,
    });
  };

  return (
    <div>
      <button onClick={(e) => handlClick(e)}>Demi</button>
    </div>
  );
};

export default Demi;
