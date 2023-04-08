import { useEffect, useState } from "react";

import { Props } from "../utils";

import blue from "../../../../assets/inGame/blue/bleuGeste.png";
import red from "../../../../assets/inGame/red/rougeGeste.png";


const Technicals: React.FC<Props> = ({
  setNewAction,
  team,
}) => {
  const [backgroundUrl, setBackgroundUrl] = useState<string>("");

  useEffect(() => {
    const newUrl = team === "red" ? red : blue;
    setBackgroundUrl(newUrl);
  }, [team]);
  return (
    <button
      style={{ backgroundImage: `url(${backgroundUrl})` }}
      className="inGameBtn"
      onClick={() => setNewAction("Techniques", team)}
    >
      GESTE <br />
      TECHNIQUE
    </button>
  );
};

export default Technicals;
