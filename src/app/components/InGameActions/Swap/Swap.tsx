import { useContext, useEffect, useState } from "react";
import { GameContext } from "../../../../context/gameContext";
import { ActionType, Team } from "../../../../context/utils";
import blue from "../../../../assets/inGame/blue/bleuSwap.png";
import red from "../../../../assets/inGame/red/rougeSwap.png";

const Swap = ({
  setNewAction,
  team,
}: {
  setNewAction: (type: ActionType, team: Team) => void;
  team: Team;
}) => {
  const { game } = useContext(GameContext);
  const [backgroundUrl, setBackgroundUrl] = useState("");

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
