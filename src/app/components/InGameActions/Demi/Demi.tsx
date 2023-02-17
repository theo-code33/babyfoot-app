import { useContext, useEffect, useState } from "react";
import { GameContext } from "../../../../context/gameContext";
import { ActionType, Team } from "../../../../context/utils";
import { updateDoc } from "../../../../db/game/setGame";
import blue from "../../../../assets/inGame/blue/bleuDemi.png";
import red from "../../../../assets/inGame/red/rougeDemi.png";

const Demi = ({
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
    <button
      style={{ backgroundImage: `url(${backgroundUrl})` }}
      className="demiBtn"
      onClick={() => setNewAction("Demi", team)}
    >
      DEMI
    </button>
  );
};

export default Demi;
