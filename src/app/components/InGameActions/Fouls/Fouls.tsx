import { useContext, useEffect, useState } from "react";
import { GameContext } from "../../../../context/gameContext";
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
    console.log("newUrl", newUrl);
  }, [team]);
  return (
    <div>
      <button
        style={{ backgroundImage: `url(${backgroundUrl})` }}
        className="fauteBtn"
        onClick={() => setNewAction("Faute", team)}
      >
        FAUTE DE
        <br />
        JEU
      </button>
    </div>
  );
};

export default Fouls;
