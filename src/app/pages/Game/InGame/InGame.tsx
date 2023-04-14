import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

import { GameContext } from "../../../../context/gameContext";
import { ActionType, Team } from "../../../../context/utils";

import { updateDoc } from "../../../../db/game/setGame";
import { LastActions } from "../../../../db/utils";

import But from "../../../components/InGameActions/But";
import Demi from "../../../components/InGameActions/Demi";
import Gamelle from "../../../components/InGameActions/Gamelle";
import Swap from "../../../components/InGameActions/Swap/Swap";
import Overlay from "../../../components/InGameActions/Overlay";
import Fouls from "../../../components/InGameActions/Fouls";
import Technicals from "../../../components/InGameActions/Technicals";

import score from "../../../../assets/inGame/scoreboard.png";
import logo from "../../../../assets/inGame/logo.png";

const InGame = () => {
  const [isEnded, setIsEnded] = useState<boolean>(false);
  const { game, setGame, action, setAction, timer, setTimer } =
    useContext(GameContext);
  const { id } = useParams<{id: string}>();
  const navigate = useNavigate();

  const [lastActionsInGame, setLastActionsInGame] = useState<LastActions>([]);

  useEffect(() => {
    if (id !== game.id) {
      navigate("/game");
    }
  }, [id]);

  useEffect(() => {
    if (game.id) {
      setTimer(game.time);
    }
    const interval = setInterval(() => {
      if (game.id) {
        setTimer((timer) => timer + 1);
      }
    }, 1000);
    if (game.blue.score >= game.maxScore || game.red.score >= game.maxScore) {
      setIsEnded(true);
    }
    return () => clearInterval(interval);
  }, [game]);

  const setNewAction = (type: ActionType, team: Team) => {
    switch (type) {
      case "Demi":
        setDemi();
        break;

      case "Swap":
        setSwap(team);
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

      case "Gamelle":
        setAction({
          ...action,
          type: type,
          drawerIsOpen: true,
          team: team,
          postOverlay: true,
        });
        break;

      case "Techniques":
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
        time: timer,
      },
      collectionId: "games",
      docId: game.id,
    });
  };

  const setSwap = (team: Team) => {
    updateDoc({
      newDatas: {
        ...game,
        [team]: {
          ...game[team],
          users: game[team].users?.map((user: any) => {
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

  const lastActions = () => {
    const lastActions = game.lastActions;
    if (lastActions) {
      const lastActionsInGame = lastActions.sort(
        (a: any, b: any) => b.time - a.time
      );
      setLastActionsInGame(lastActionsInGame.slice(0, 4));
    }
  };

  const getUserName = (playerNumber: number) => {
    const user = game.blue.users?.find(
      (user) => user.playerNumber === playerNumber
    );
    if (user) {
      return user.userName;
    } else {
      const user = game.red.users?.find(
        (user) => user.playerNumber === playerNumber
      );
      if (user) {
        return user.userName;
      }
    }
  };

  useEffect(() => {
    lastActions();
  }, [game]);

  function formatTime(totalSeconds: number): string {
    const minutes: number = Math.floor(totalSeconds / 60);
    const seconds: number = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }

  const handleClick = async () => {
    try {
      await updateDoc({
        newDatas: {
          ...game,
          isActive: false,
          isPlaying: false
        },
        collectionId: "games",
        docId: game.id,
      })
      navigate(`/game/${game.id}/end-game`);
      setGame({ ...game, isActive: false });
    } catch (error) {
      console.log(error);
    }
  }

  const time = formatTime(timer);

  return (
    <div className="inGame">
      <img className="scoreboard" src={score} alt="" />
      <div className="header">
        <div className="left-content">
          <img className="logo" src={logo} alt="" />
          <h2>{time}</h2>
        </div>
        <div className="score">
          <p>{game.blue.score}</p>
          <p>{game.red.score}</p>
        </div>
        <div className="right-content">
          <div className="pause">I&nbsp;I</div>
          <div
            className="leave"
            onClick={handleClick}
          >
            QUITTER LA PARTIE
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          height: "50px",
        }}
      >
        {game.currentPoint > 1 && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              backgroundColor: "#FC7443",
              flexDirection: "column",
              alignItems: "center",
              width: "200px",
              height: "50px",
              marginBottom: "-20px",
            }}
          >
            <p
              style={{
                color: "white",
                fontSize: "20px",
                fontWeight: "bold",
                margin: "2px",
              }}
            >
              Demi en cours : {game.currentPoint}
            </p>
          </div>
        )}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginTop: "50px",
        }}
      >
        <div className="main-content">
          <But setNewAction={setNewAction} team="blue" />
          <div className="demiGamelle">
            <Demi setNewAction={setNewAction} team="blue" />
            <Gamelle setNewAction={setNewAction} team="blue" />
          </div>
          <div className="techniquesFaute">
            <Technicals setNewAction={setNewAction} team="blue" />
            <Fouls setNewAction={setNewAction} team="blue" />
          </div>
          <Swap setNewAction={setNewAction} team="blue" />
        </div>

        <div className="main-content">
          <But setNewAction={setNewAction} team="red" />
          <div style={{ display: "flex", gap: "10px" }}>
            <Demi setNewAction={setNewAction} team="red" />
            <Gamelle setNewAction={setNewAction} team="red" />
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <Technicals setNewAction={setNewAction} team="red" />
            <Fouls setNewAction={setNewAction} team="red" />
          </div>
          <Swap setNewAction={setNewAction} team="red" />
        </div>
      </div>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
        }}
      >
        {isEnded ? (
          <Modal
            open={isEnded}
            onClose={() => {
              setIsEnded(false);
            }}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                width: "500px",
                height: "300px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                backgroundColor: "#04131E",
                borderRadius: "10px",
              }}
            >
              <h2>FIN DE LA PARTIE</h2>

              <p
                onClick={handleClick}
                className="leave"
              >
                QUITTER LA PARTIE
              </p>
            </Box>
          </Modal>
        ) : null}
      </Box>

      <Overlay />
    </div>
  );
};

export default InGame;
