import { useEffect, useState } from "react";

import { Props } from "../utils";

import blue from "../../../../assets/inGame/blue/bleuFaute.png";
import red from "../../../../assets/inGame/red/rougeFaute.png";

const Fouls: React.FC<Props> = ({
  setNewAction,
  team,
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
