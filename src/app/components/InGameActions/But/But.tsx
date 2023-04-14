import { useEffect, useState } from "react";

import { Props } from "../utils";

import blue from "../../../../assets/inGame/blue/bleuBut.png";
import red from "../../../../assets/inGame/red/rougeBut.png";

const But: React.FC<Props> = ({
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
      className="inGameButBtn"
      onClick={() => setNewAction("But", team)}
    >
      BUT !
    </button>
  );
};

export default But;
