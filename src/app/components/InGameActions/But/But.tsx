import { useContext, useState } from "react";
import { GameContext } from "../../../../context/gameContext";
import { ActionType, Team } from "../../../../context/utils";

const But = ({
  setNewAction,
}: {
  setNewAction: (type: ActionType, team: Team) => void;
}) => {
  return (
    <div>
      <button onClick={() => setNewAction("But", "blue")}>BUT</button>
    </div>
  );
};

export default But;
