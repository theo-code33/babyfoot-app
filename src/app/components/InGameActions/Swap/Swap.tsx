import { useContext, useEffect, useState } from "react";
import { GameContext } from "../../../../context/gameContext";
import { ActionType, Team } from "../../../../context/utils";
import { updateDoc } from "../../../../db/game/setGame";
import blue from "../../../../assets/inGame/blue/bleuSwap.png";
import red from "../../../../assets/inGame/red/rougeSwap.png";

const Swap = ({
  setNewAction,
  team,
}: {
  setNewAction: (type: ActionType, team: Team) => void;
  team: Team;
}) => {
  const [backgroundUrl, setBackgroundUrl] = useState("");

  useEffect(() => {
    const newUrl = team === "red" ? red : blue;
    setBackgroundUrl(newUrl);
    console.log("newUrl", newUrl);
  }, [team]);
  return (
    <div>
      <button
        style={{ backgroundImage: `url(${backgroundUrl})` }}
        className="swapBtn"
        onClick={() => setNewAction("Swap", team)}
      >
        CHANGER DE <br />
        POSTE
      </button>
    </div>
  );
};

export default Swap;
