import { useContext, useState } from "react";
import { GameContext } from "../../../../context/gameContext";
import { ActionType, Team } from "../../../../context/utils";

const But = ({
  setNewAction,
  team,
}: {
  setNewAction: (type: ActionType, team: Team) => void;
  team: Team;
}) => {
  return (
    <div>
      <button onClick={() => setNewAction("But", team)}>BUT</button>
    </div>
  );
};

export default But;
