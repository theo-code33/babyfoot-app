import { useEffect, useState } from "react";

import { Props } from "../utils";

import blue from "../../../../assets/inGame/blue/bleuGamelle.png";
import red from "../../../../assets/inGame/red/rougeGamelle.png";

const Gamelle: React.FC<Props> = ({
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
      onClick={() => setNewAction("Gamelle", team)}
    >
      GAMELLE
    </button>
  );
};

export default Gamelle;
