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
  const { game, action, setAction, timer } = useContext(GameContext);
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
    console.log("je suis dans mon handleClick");
    if (
      e.currentTarget.value === "Attaquant" ||
      e.currentTarget.value === "Défenseur" ||
      e.currentTarget.value === "Mixte" ||
      e.currentTarget.value === ""
    ) {
      position = e.currentTarget.value as Position;
      if (foulName === "pisette" || foulName === "rateau") {
        setCurrentPosition("Attaquant");
      } else {
        setCurrentPosition(position);
      }
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
    console.log("je suis dans mon useEffect");

    if (action.type != "" && currentPosition != "" && action.type != "Faute") {
      switch (action.type) {
        case "But":
          newDatas = setButDatas({
            game,
            team: action.team,
            currentPoste,
            currentPosition,
            time: timer,
          });

          break;

        case "Gamelle":
          newDatas = setGamelleDatas({
            game,
            team: action.team,
            currentPoste,
            currentPosition,
            gamelle,
            time: timer,
          });
          break;

        // case "Faute":
        //   newDatas = setFoulsDatas({
        //     game,
        //     team: action.team,
        //     currentPosition,
        //     foulName,
        //     currentPoste,
        //   });

        //   setFoulName("");
        //   break;

        case "Techniques":
          newDatas = setTechnicalsDatas({
            game,
            team: action.team,
            currentPoste,
            currentPosition,
            technicalName,
            time: timer,
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
    } else if (
      action.type != "" &&
      foulName != "" &&
      currentPosition != "" &&
      action.type === "Faute"
    ) {
      console.log("je suis dans le else if");

      newDatas = setFoulsDatas({
        game,
        team: action.team,
        currentPosition,
        foulName,
        currentPoste,
        time: timer,
      });

      updateDoc({
        newDatas,
        collectionId: "games",
        docId: game.id,
      });

      setFoulName("");
      setAction({ ...action, drawerIsOpen: false, postOverlay: false });
      setCurrentPosition("");
    }
  }, [currentPosition, foulName, action.type]);

  return (
    <div>
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
          {action.type === "Techniques" && (
            <div>
              <button
                style={{
                  backgroundColor:
                    technicalName === "cendar" ? "blue" : "white",
                }}
                onClick={() => {
                  setTechnicalName("cendar");
                  setAction({ ...action, postOverlay: true });
                }}
              >
                cendar
              </button>
              <button
                style={{
                  backgroundColor: technicalName === "lob" ? "blue" : "white",
                }}
                onClick={() => {
                  setTechnicalName("lob");
                  setAction({ ...action, postOverlay: true });
                }}
              >
                lob
              </button>
              <button
                style={{
                  backgroundColor:
                    technicalName === "but incroyable" ? "blue" : "white",
                }}
                onClick={() => {
                  setTechnicalName("but incroyable");
                  setAction({ ...action, postOverlay: true });
                }}
              >
                but incroyable
              </button>
            </div>
          )}
        </div>

        <div>
          {action.type === "Faute" && (
            <div>
              <button
                value="Mixte"
                onClick={(e) => {
                  setFoulName("roulette");
                  setAction({ ...action });
                  if (game[action.team].users.length === 1) {
                    handleClick(e, action.team);
                  }
                }}
              >
                roulette
              </button>
              <button
                value={game[action.team].users.length === 1 ? "Mixte" : ""}
                onClick={(e) => {
                  setFoulName("pisette");
                  handleClick(e, action.team);
                }}
              >
                pisette
              </button>
              <button
                value={game[action.team].users.length === 1 ? "Mixte" : ""}
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

        {action.team &&
          action.type === "Faute" &&
          foulName === "roulette" &&
          game[action.team].users.length > 1 && (
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
