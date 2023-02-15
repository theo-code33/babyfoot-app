import { useContext } from "react";
import { GameContext } from "../../../../context/gameContext";
import { ActionType, Team } from "../../../../context/utils";
import { updateDoc } from "../../../../db/game/setGame";

const Demi = ({
  setNewAction,
  team,
}: {
  setNewAction: (type: ActionType, team: Team) => void;
  team: Team;
}) => {
  return (
    <div>
      <button onClick={() => setNewAction("Demi", team)}>Demi</button>
    </div>
  );
};

export default Demi;
