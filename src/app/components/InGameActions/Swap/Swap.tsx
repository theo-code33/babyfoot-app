import { useContext } from "react";
import { GameContext } from "../../../../context/gameContext";
import { ActionType } from "../../../../context/utils";
import { updateDoc } from "../../../../db/game/setGame";

const Swap = ({
  setNewAction,
}: {
  setNewAction: (type: ActionType) => void;
}) => {
  return (
    <div>
      <button onClick={() => setNewAction("Swap")}>Swap Team</button>
    </div>
  );
};

export default Swap;
