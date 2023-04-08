import { useEffect, useState } from "react";

import { Props } from "../utils";

import blue from "../../../../assets/inGame/blue/bleuDemi.png";
import red from "../../../../assets/inGame/red/rougeDemi.png";

const Demi: React.FC<Props> = ({
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
      onClick={() => setNewAction("Demi", team)}
    >
      DEMI
    </button>
  );
};

export default Demi;
