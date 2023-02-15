import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GameContext } from "../../../../context/gameContext";
import { ActionType, Team } from "../../../../context/utils";
import { updateDoc } from "../../../../db/game/setGame";
import But from "../../../components/InGameActions/But";
import Demi from "../../../components/InGameActions/Demi";
import Gamelle from "../../../components/InGameActions/Gamelle";
import Swap from "../../../components/InGameActions/Swap/Swap";
import Overlay from "../../../components/InGameActions/Overlay";
import Fouls from "../../../components/InGameActions/Fouls";

const InGame = () => {
  const { game, setGame, action, setAction } = useContext(GameContext);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id !== game.id) {
      navigate("/game");
    }
  }, [id]);

  const setNewAction = (type: ActionType, team: Team) => {
    switch (type) {
      case "Demi":
        setDemi();
        break;

      case "Swap":
        setSwap();
        break;

      case "Faute":
        setAction({
          ...action,
          type: type,
          drawerIsOpen: true,
          team: team,
          postOverlay: false,
        });
        break;

      case "But":
        setAction({
          ...action,
          type: type,
          drawerIsOpen: true,
          team: team,
          postOverlay: true,
        });
        break;

      default:
        setAction({
          ...action,
          type: type,
          drawerIsOpen: true,
          team: team,
          postOverlay: false,
        });
        break;
    }
  };

  const setDemi = () => {
    updateDoc({
      newDatas: {
        ...game,
        currentPoint: game.currentPoint + 1,
      },
      collectionId: "games",
      docId: game.id,
    });
  };

  const setSwap = () => {
    updateDoc({
      newDatas: {
        ...game,
        blue: {
          ...game.blue,
          users: game.blue.users?.map((user: any) => {
            if (user.playerPoste === "Attaquant") {
              return {
                ...user,
                playerPoste: "Défenseur",
              };
            } else if (user.playerPoste === "Défenseur") {
              return {
                ...user,
                playerPoste: "Attaquant",
              };
            }
            return user;
          }),
        },
      },
      collectionId: "games",
      docId: game.id,
    });
  };

  return (
    <div>
      <div>
        <h2>Point Équipe bleue :{game.blue.score}</h2>
        {/* <h2>{game.blue.users?[0].goals}</h2> */}
      </div>
      <div>
        <h2>Point Équipe rouge :{game.red.score}</h2>
      </div>
      <div>
        <h2>CurrentPoint :{game.currentPoint}</h2>
      </div>

      <div>
        <h2>Équipe bleue</h2>
        <But setNewAction={setNewAction} team="blue" />
        <Gamelle setNewAction={setNewAction} team="blue" />
        <Swap setNewAction={setNewAction} team="blue" />
        <Demi setNewAction={setNewAction} team="blue" />
        <Fouls setNewAction={setNewAction} team="blue" />
      </div>

      <div>
        <h2>Équipe rouge</h2>
        <But setNewAction={setNewAction} team="red" />
        <Gamelle setNewAction={setNewAction} team="red" />
        <Swap setNewAction={setNewAction} team="red" />
        <Demi setNewAction={setNewAction} team="red" />
        <Fouls setNewAction={setNewAction} team="red" />
      </div>

      <Overlay />
    </div>
  );
};

export default InGame;
