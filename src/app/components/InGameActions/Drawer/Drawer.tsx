import React, { useContext, useState } from "react";
import { GameContext } from "../../../../context/gameContext";
import { Team } from "../../../../context/utils";
import { updateDoc } from "../../../../db/game/setGame";
import { FoulName, Poste, PostesName, UserGame } from "../../../../db/utils";
import { setButDatas, setFoulsDatas, setGamelleDatas } from "./utils";

const Drawer = () => {
  const { game, action } = useContext(GameContext);
  const [gamelle, setGamelle] = useState<string>("");
  const [foulName, setFoulName] = useState<FoulName>("");

  const determinerPosition = (value: PostesName) => {
    if (value === "AC" || value === "AG" || value === "AD" || value === "M") {
      return "Attaquant";
    } else if (value === "G" || value === "DG" || value === "DD") {
      return "Défenseur";
    } else {
      return "error";
    }
  };

  const handlClick = (e: any, team: Team) => {
    const currentPosition: PostesName = e.target.value;
    const currentPoste: string = determinerPosition(currentPosition);

    const otherTeam: Team = team === "blue" ? "blue" : "red";

    const points = game.blue.score + game.currentPoint;

    let newDatas = {};

    switch (action.type) {
      case "But":
        newDatas = setButDatas({
          game,
          team,
          currentPoste,
          currentPosition,
        });
        break;

      case "Gamelle":
        newDatas = setGamelleDatas({
          game,
          team,
          currentPoste,
          currentPosition,
          gamelle,
        });
        break;

      case "Faute":
        newDatas = setFoulsDatas({
          game,
          team,
          currentPoste,
          foulName,
        });
        break;

      default:
        break;
    }

    const datasFaute = {};

    const datasTechniques = {};

    updateDoc({
      newDatas,
      collectionId: "games",
      docId: game.id,
    });
    // setPositions(!positions);
  };

  return (
    <div>
      {/* {positions && (
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
      )} */}

      {/* {chooseBonus && (
        <div>
          <button value="+" onClick={(e) => handlePosition(e)}>
            +1 pour vous
          </button>
          <button value="-" onClick={(e) => handlePosition(e)}>
            -1 pour l'adversaire
          </button>
        </div>
      )} */}
    </div>
  );
};

export default Drawer;
