import { useContext } from "react";
import { GameContext } from "../../../../context/gameContext";
import { ActionType, Team } from "../../../../context/utils";

const Fouls = ({
  setNewAction,
  team,
}: {
  setNewAction: (type: ActionType, team: Team) => void;
  team: Team;
}) => {
  return (
    <div>
      <button onClick={() => setNewAction("Faute", team)}>Faute de jeu</button>
    </div>
  );
};

export default Fouls;
