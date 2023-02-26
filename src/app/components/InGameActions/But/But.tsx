import { useEffect, useState } from "react";
import { ActionType, Team } from "../../../../context/utils";
import blue from "../../../../assets/inGame/blue/bleuBut.png";
import red from "../../../../assets/inGame/red/rougeBut.png";

const But = ({
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
  }, [team]);
  return (
    <button
      style={{ backgroundImage: `url(${backgroundUrl})` }}
      className="inGameButBtn"
      onClick={() => setNewAction("But", team)}
    >
      BUT !
    </button>
  );
};

export default But;
