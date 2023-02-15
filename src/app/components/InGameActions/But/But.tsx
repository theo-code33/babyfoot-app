import { useContext, useState } from "react";
import { GameContext } from "../../../../context/gameContext";
import { ActionType } from "../../../../context/utils";

const But = ({
  setNewAction,
}: {
  setNewAction: (type: ActionType) => void;
}) => {
  return (
    <div>
      <button onClick={() => setNewAction("But")}>BUT</button>
    </div>
  );
};

export default But;
