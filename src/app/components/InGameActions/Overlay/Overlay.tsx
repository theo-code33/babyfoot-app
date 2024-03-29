import React, { useContext, useEffect, useState } from "react";
import { GameContext } from "../../../../context/gameContext";
import { Team } from "../../../../context/utils";
import { updateDoc } from "../../../../db/game/setGame";
import { Drawer } from "@mui/material";

import {
  FoulName,
  Position,
  PostesName,
  TechnicalName,
} from "../../../../db/utils";
import {
  setButDatas,
  setFoulsDatas,
  setGamelleDatas,
  setTechnicalsDatas,
  setButCSCDatas,
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
    if(game === undefined) return;
    let position: Position = "";
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

    // const otherTeam: Team = team === "blue" ? "blue" : "red";

    // const points = game.blue.score + game.currentPoint;

    if (e.currentTarget.value === "CSC") {
      const newDatas = setButCSCDatas({
        game,
        team: team,
      });

      updateDoc({
        newDatas,
        collectionId: "games",
        docId: game.id,
      });
      setAction({ ...action, drawerIsOpen: false, postOverlay: false });
    }
  };

  let newDatas = {};

  useEffect(() => {
    if(game === undefined) return;
    const data = {
      game,
      team: action.team,
      currentPoste,
      currentPosition,
      time: timer,
    }
    if (action.type !== "" && currentPosition !== "" && action.type !== "Faute") {
      switch (action.type) {
        case "But":
          newDatas = setButDatas(data);

          break;

        case "Gamelle":
          newDatas = setGamelleDatas({...data, gamelle});
          break;
        case "Techniques":
          newDatas = setTechnicalsDatas({...data, technicalName});
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
      setGamelle("");
      setTechnicalName("");
    } else if (
      action.type !== "" &&
      foulName !== "" &&
      currentPosition !== "" &&
      action.type === "Faute"
    ) {
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

  useEffect(() => {
    if (!action.drawerIsOpen) {
      setCurrentPosition("");
      setGamelle("");
      setTechnicalName("");
      setFoulName("");
    }
  }, [action.drawerIsOpen]);

  return (
    <div>
      <Drawer
        anchor="bottom"
        open={action.drawerIsOpen}
        onClose={
          () => {
            setAction({ ...action, drawerIsOpen: false, postOverlay: false });
            setCurrentPosition("");
            setGamelle("");
            setTechnicalName("");
            setFoulName("");
          }
          // setAction({ ...action, drawerIsOpen: false, postOverlay: true })
        }
        sx={{
          "& .MuiDrawer-paper": {
            backgroundColor: "#042E4A",
            color: "white",
            width: "100%",
          },
        }}
      >
        <div>
          {action.type === "Gamelle" && (
            <div className="overlay-action">
              <h2>CHOISISSEZ LA SENTENCE</h2>

              <div className="btn-group">
                <button
                  onClick={() => {
                    setGamelle("+");
                    setAction({ ...action, postOverlay: true });
                  }}
                  className={`${action.team === "blue" ? "blue" : "red"} ${
                    gamelle === "+" ? "active" : ""
                  }`}
                >
                  +1 pour vous
                </button>
                <button
                  onClick={() => {
                    setGamelle("-");
                    setAction({ ...action, postOverlay: true });
                  }}
                  className={`${action.team === "blue" ? "blue" : "red"} ${
                    gamelle === "-" ? "active" : ""
                  }`}
                >
                  -1 pour l'adversaire
                </button>
              </div>
            </div>
          )}
        </div>
        <div>
          {action.type === "Techniques" && (
            <div className="overlay-action">
              <h2>CHOISISSEZ LA TECHNIQUE</h2>
              <div className="btn-group">
                <button
                  onClick={() => {
                    setTechnicalName("cendar");
                    setAction({ ...action, postOverlay: true });
                  }}
                  className={`${action.team === "blue" ? "blue" : "red"} ${
                    technicalName === "cendar" ? "active" : ""
                  }`}
                >
                  Cendar
                </button>
                <button
                  onClick={() => {
                    setTechnicalName("lob");
                    setAction({ ...action, postOverlay: true });
                  }}
                  className={`${action.team === "blue" ? "blue" : "red"} ${
                    technicalName === "lob" ? "active" : ""
                  }`}
                >
                  Lob
                </button>
                <button
                  onClick={() => {
                    setTechnicalName("but incroyable");
                    setAction({ ...action, postOverlay: true });
                  }}
                  className={`${action.team === "blue" ? "blue" : "red"} ${
                    technicalName === "but incroyable" ? "active" : ""
                  }`}
                >
                  But Incroyable
                </button>
              </div>
            </div>
          )}
        </div>

        <div>
          {game !== undefined && action.type === "Faute" && (
            <div className="overlay-action">
              <div className="btn-group">
                <button
                  value="Mixte"
                  onClick={(e) => {
                    setFoulName("roulette");
                    setAction({ ...action });
                    if (game[action.team].users.length === 1) {
                      handleClick(e, action.team);
                    }
                  }}
                  className={`${action.team === "blue" ? "blue" : "red"} ${
                    foulName === "roulette" ? "active" : ""
                  }`}
                >
                  Roulette
                </button>
                <button
                  value={
                    game[action.team].users.length === 1 ? "Mixte" : "Attaquant"
                  }
                  onClick={(e) => {
                    setFoulName("pisette");
                    handleClick(e, action.team);
                  }}
                  className={`${action.team === "blue" ? "blue" : "red"} ${
                    foulName === "pisette" ? "active" : ""
                  }`}
                >
                  Pisette
                </button>
                <button
                  value={
                    game[action.team].users.length === 1 ? "Mixte" : "Attaquant"
                  }
                  onClick={(e) => {
                    setFoulName("rateau");
                    handleClick(e, action.team);
                  }}
                  className={`${action.team === "blue" ? "blue" : "red"} ${
                    foulName === "rateau" ? "active" : ""
                  }`}
                >
                  Rateau
                </button>
              </div>
            </div>
          )}
        </div>

        {action.team && action.postOverlay && (
          <Postes
            action={action}
            handleClick={handleClick}
            gamelle={action.type === "Gamelle" ? gamelle : "but"}
            technicalName={technicalName}
          />
        )}

        {game !== undefined && action.team &&
          action.type === "Faute" &&
          foulName === "roulette" &&
          game[action.team].users.length > 1 && (
            <Positions action={action} handleClick={handleClick} />
          )}
      </Drawer>
    </div>
  );
};

export default Overlay;
