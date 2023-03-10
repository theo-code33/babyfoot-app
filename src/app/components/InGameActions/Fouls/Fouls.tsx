import { useEffect, useState } from "react";
import { ActionType, Team } from "../../../../context/utils";
import blue from "../../../../assets/inGame/blue/bleuFaute.png";
import red from "../../../../assets/inGame/red/rougeFaute.png";

const Fouls = ({
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
      className="inGameBtn"
      onClick={() => setNewAction("Faute", team)}
    >
      FAUTE DE
      <br />
      JEU
    </button>
  );
};

export default Fouls;
