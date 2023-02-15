import React, { useContext, useEffect, useState } from "react";
import { GameContext } from "../../../../context/gameContext";
import { Team } from "../../../../context/utils";
import { updateDoc } from "../../../../db/game/setGame";
import { Drawer } from "@mui/material";

import {
  FoulName,
  Position,
  Poste,
  PostesName,
  TechnicalName,
  UserGame,
} from "../../../../db/utils";
import {
  setButDatas,
  setFoulsDatas,
  setGamelleDatas,
  setTechnicalsDatas,
} from "./utils";
import Postes from "../Postes";
import Positions from "../Positions";

const Overlay = () => {
  const { game, action, setAction } = useContext(GameContext);
  const [gamelle, setGamelle] = useState<string>("");
  const [foulName, setFoulName] = useState<FoulName>("");
  const [technicalName, setTechnicalName] = useState<TechnicalName>("");
  const [currentPosition, setCurrentPosition] = useState<Position>("");
  const [currentPoste, setCurrentPoste] = useState<PostesName>("AD");

  const determinerPosition = (value: PostesName) => {
    if (value === "AC" || value === "AG" || value === "AD" || value === "M") {
      return "Attaquant";
    } else if (value === "G" || value === "DG" || value === "DD") {
      return "Défenseur";
    } else {
      return "";
    }
  };

  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    team: Team
  ) => {
    let position: Position = "";

    if (
      e.currentTarget.value === "Attaquant" ||
      e.currentTarget.value === "Défenseur"
    ) {
      position = e.currentTarget.value as Position;
      setCurrentPosition(position);
    } else {
      const poste = e.currentTarget.value as PostesName;
      const position = determinerPosition(poste);
      setCurrentPoste(poste);
      setCurrentPosition(position);
    }

    const otherTeam: Team = team === "blue" ? "blue" : "red";

    const points = game.blue.score + game.currentPoint;
  };

  let newDatas = {};

  useEffect(() => {
    if (action.type != "" && currentPosition != "") {
      switch (action.type) {
        case "But":
          newDatas = setButDatas({
            game,
            team: action.team,
            currentPoste,
            currentPosition,
          });
          break;

        case "Gamelle":
          newDatas = setGamelleDatas({
            game,
            team: action.team,
            currentPoste,
            currentPosition,
            gamelle,
          });
          break;

        case "Faute":
          newDatas = setFoulsDatas({
            game,
            team: action.team,
            currentPosition,
            foulName,
          });

          break;

        case "Techniques":
          newDatas = setTechnicalsDatas({
            game,
            team: action.team,
            currentPoste,
            currentPosition,
            technicalName,
          });
          break;

        default:
          break;
      }

      updateDoc({
        newDatas,
        collectionId: "games",
        docId: game.id,
      });

      setAction({ ...action, drawerIsOpen: false, postOverlay: false });
      setCurrentPosition("");
    }
  }, [currentPosition]);

  return (
    <div>
      ‡
      <Drawer
        anchor="bottom"
        open={action.drawerIsOpen}
        onClose={() =>
          setAction({ ...action, drawerIsOpen: false, postOverlay: true })
        }
      >
        <div>
          {action.type === "Gamelle" && (
            <div>
              <button
                style={{
                  backgroundColor: gamelle === "+" ? "green" : "white",
                }}
                onClick={() => {
                  setGamelle("+");
                  setAction({ ...action, postOverlay: true });
                }}
              >
                +1 pour vous
              </button>
              <button
                style={{
                  backgroundColor: gamelle === "-" ? "green" : "white",
                }}
                onClick={() => {
                  setGamelle("-");
                  setAction({ ...action, postOverlay: true });
                }}
              >
                -1 pour l'adversaire
              </button>
            </div>
          )}
        </div>

        <div>
          {action.type === "Faute" && (
            <div>
              <button
                onClick={() => {
                  setFoulName("roulette");
                  setAction({ ...action });
                }}
              >
                roulette
              </button>
              <button
                onClick={(e) => {
                  setFoulName("pisette");
                  handleClick(e, action.team);
                }}
              >
                pisette
              </button>
              <button
                onClick={(e) => {
                  setFoulName("rateau");
                  handleClick(e, action.team);
                }}
              >
                rateau
              </button>
            </div>
          )}
        </div>

        {action.team && action.postOverlay && (
          <Postes action={action} handleClick={handleClick} />
        )}

        {action.team && action.type === "Faute" && foulName === "roulette" && (
          <Positions action={action} handleClick={handleClick} />
        )}

        <button onClick={() => setAction({ ...action, drawerIsOpen: false })}>
          Annuler
        </button>
      </Drawer>
    </div>
  );
};

export default Overlay;
