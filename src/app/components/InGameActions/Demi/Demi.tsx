import { useContext } from "react";
import { GameContext } from "../../../../context/gameContext";
import { ActionType, Team } from "../../../../context/utils";
import { updateDoc } from "../../../../db/game/setGame";

const Demi = ({
  setNewAction,
}: {
  setNewAction: (type: ActionType) => void;
}) => {
  return (
    <div>
      <button onClick={() => setNewAction("Demi")}>Demi</button>
    </div>
  );
};

export default Demi;
