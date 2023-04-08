import { useContext, useEffect, useState } from "react";

import { GameContext } from "../../../../context/gameContext";

import { Props } from "../utils";

import blue from "../../../../assets/inGame/blue/bleuSwap.png";
import red from "../../../../assets/inGame/red/rougeSwap.png";

const Swap: React.FC<Props> = ({
  setNewAction,
  team,
}) => {
  const { game } = useContext(GameContext);
  const [backgroundUrl, setBackgroundUrl] = useState<string>("");

  useEffect(() => {
    const newUrl = team === "red" ? red : blue;
    setBackgroundUrl(newUrl);
  }, [team]);
  return (
    <div>
      {game[team].users.length > 1 && (
        <div className="swap">
          <div>
            {game[team].users.map((user) => (
              <p>
                {user.userName} : {user.playerPoste}
              </p>
            ))}
          </div>

          <button
            style={{ backgroundImage: `url(${backgroundUrl})` }}
            className="swapBtn"
            onClick={() => setNewAction("Swap", team)}
          >
            CHANGER DE POSTE
          </button>
        </div>
      )}
    </div>
  );
};

export default Swap;
