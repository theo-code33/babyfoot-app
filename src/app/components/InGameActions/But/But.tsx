import { useContext, useState } from "react";
import { GameContext } from "../../../../context/gameContext";
import { updateDoc } from "../../../../db/game/setGame";

const But = () => {
  const [positions, setPositions] = useState<boolean>(false);

  function determinerPosition(value: string): string {
    if (value === "AC" || value === "AG" || value === "AD" || value === "M") {
      return "Attaquant";
    } else if (
      value === "G" ||
      value === "DG" ||
      value === "DC" ||
      value === "DD"
    ) {
      return "Défenseur";
    } else {
      return "error";
    }
  }
  const { game, setGame } = useContext(GameContext);

  const handleGoal = () => {
    setPositions(!positions);
  };

  const handlClick = (e: any) => {
    console.log(e.target.value);
    const poste = determinerPosition(e.target.value);

    updateDoc({
      newDatas: {
        ...game,
        blue: {
          ...game.blue,
          score: game.blue.score + 1,
          users: game.blue.users?.map((user) => {
            if (user.playerPoste === poste) {
              user.goals = user.goals + 1;
              user.postes?.map((poste) => {
                if (poste.name === e.target.value) {
                  poste.goals = poste.goals + 1;
                }
              });
            }
            return user;
          }),
        },
      },
      collectionId: "games",
      docId: "kdniUnglQAtDDQERnsua",
    });
    setPositions(!positions);
  };
  return (
    <div>
      <button onClick={handleGoal}>BUT</button>

      {positions && (
        <div>
          <button value="AG" onClick={(e) => handlClick(e)}>
            AG
          </button>
          <button onClick={(e) => handlClick(e)} value="AC">
            AC
          </button>
          <button onClick={(e) => handlClick(e)} value="AD">
            AD
          </button>
          <button onClick={(e) => handlClick(e)} value="M">
            M
          </button>
          <button onClick={(e) => handlClick(e)} value="DG">
            DG
          </button>
          <button onClick={(e) => handlClick(e)} value="DC">
            DC
          </button>
          <button onClick={(e) => handlClick(e)} value="DD">
            DD
          </button>
          <button onClick={(e) => handlClick(e)} value="G">
            G
          </button>
        </div>
      )}
    </div>
  );
};

export default But;
