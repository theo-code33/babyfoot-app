import { useContext, useState } from "react";
import { Context } from "../../../../context/context";
import { updateDoc } from "../../../../db/game/setGame";

const Gamelle = () => {
  const [chooseBonus, setChooseBonus] = useState<boolean>(false);
  const [gamelle, setGamelle] = useState<string>("");
  const [positions, setPositions] = useState<boolean>(false);

  const { game, setGame } = useContext(Context);

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

  const handleGoal = () => {
    setChooseBonus(!chooseBonus);
  };
  const handlePosition = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setGamelle(e.currentTarget.value);
    console.log(gamelle);

    setPositions(!positions);
  };

  const handlClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    console.log(e.currentTarget.value);
    const poste = determinerPosition(e.currentTarget.value);

    updateDoc({
      newDatas: {
        ...game,
        blue: {
          ...game.blue,
          score: gamelle === "+" ? game.blue.score + 1 : game.blue.score,
          users: game.blue.users?.map((user) => {
            if (user.playerPoste === poste) {
              user.goals = user.goals + 1;
              user.postes?.map((poste) => {
                if (poste.name === e.currentTarget.value) {
                  poste.goals = poste.goals + 1;
                }
              });
            }
            return user;
          }),
        },
        red: {
          ...game.red,
          score: gamelle === "-" ? game.red.score - 1 : game.red.score,
        },
      },
      collectionId: "games",
      docId: "kdniUnglQAtDDQERnsua",
    });
    setPositions(!positions);
    setChooseBonus(!chooseBonus);
  };
  return (
    <div>
      <button onClick={handleGoal}>Gamelle</button>
      {chooseBonus && (
        <div>
          <button value="+" onClick={(e) => handlePosition(e)}>
            +1 pour vous
          </button>
          <button value="-" onClick={(e) => handlePosition(e)}>
            -1 pour l'adversaire
          </button>
        </div>
      )}
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

export default Gamelle;
