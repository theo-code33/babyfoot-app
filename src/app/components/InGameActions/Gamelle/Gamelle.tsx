import { useEffect, useState } from "react";
import { ActionType, Team } from "../../../../context/utils";
import blue from "../../../../assets/inGame/blue/bleuGamelle.png";
import red from "../../../../assets/inGame/red/rougeGamelle.png";

const Gamelle = ({
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
        className="gamelleBtn"
        onClick={() => setNewAction("Gamelle", team)}
      >
        GAMELLE
      </button>
    </div>
  );
};

export default Gamelle;
