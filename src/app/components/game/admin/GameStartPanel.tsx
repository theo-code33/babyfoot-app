import { useContext, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box } from "@mui/material";

import { GameContext } from "../../../../context/gameContext";
import { UserContext } from "../../../../context/userContext";
import { UserContextType } from "../../../../context/utils";

import { closeGame, updateGameStatus } from "../../../../db/game/updateGame";

import QRCode from "qrcode";

import backgroundGameStartPanel from "../../../../assets/background-start-game.svg";

const GameStartPanel = () => {
  const { id } = useParams<{ id: string }>();
  const { game, setGame } = useContext(GameContext);
  const { user } = useContext(UserContext) as UserContextType;
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const isProd = process.env.REACT_APP_PROD === "production";

  const handleStartGame = async (): Promise<void> => {
    if (game === undefined) return;
    const updatedGame = await updateGameStatus(game, true);
    const { id } = updatedGame;
    setGame(updatedGame);
    navigate(`/game/${id}`);
  };

  const handleCloseGame = async (): Promise<void> => {
    if (game === undefined || user === undefined) return;
    await closeGame(game, user);
    setGame(undefined);
    navigate(`/game/create`);
  };

  useEffect(() => {
    if (user && user.isAdmin !== true) {
      navigate("/game");
    } else {
      QRCode.toCanvas(
        canvasRef.current,
        isProd
          ? `https://babyfoot-app-prod.web.app/qr-code/${id}`
          : `https://babyfoot-app-24750.web.app/qr-code/${id}`,
        (error) => error && console.error(error)
      );
    }
  }, []);

  const style: React.CSSProperties = {
    background: `url(${backgroundGameStartPanel})`,
  };

  return (
    <Box sx={style} className="container-start-game">
      <button
        onClick={handleCloseGame}
        className="leave"
        style={{ position: "absolute", top: "50px", right: "50px" }}
      >
        Quitter la partie
      </button>
      <Box className="content-start-game">
        <Box className="container-player">
          {game !== undefined &&
            game.blue &&
            game.blue.users.map((player, index) => {
              return (
                <div key={index} className="player blue">
                  <p>
                    {player.userName
                      ? player.userName
                      : `Player ${player.playerNumber}`}
                  </p>
                </div>
              );
            })}
        </Box>
        <Box className="container-code">
          <h2>Scanner pour se connecter</h2>
          <canvas ref={canvasRef} />
          <p>ou</p>
          <p className="link-code">
            {isProd
              ? "https://babyfoot-app-prod.web.app/signin/"
              : "https://babyfoot-app-24750.web.app/signin/"}
            <span style={{ fontWeight: "bold", fontSize: "18px" }}>{id}</span>
          </p>
        </Box>
        <Box className="container-player red-container">
          {game !== undefined &&
            game.red &&
            game.red.users.map((player, index) => {
              return (
                <div key={index} className="player red">
                  <p>
                    {player.userName
                      ? player.userName
                      : `Player ${player.playerNumber}`}
                  </p>
                </div>
              );
            })}
        </Box>
      </Box>
      <button onClick={handleStartGame} className="button-start">
        Start !
      </button>
    </Box>
  );
};

export default GameStartPanel;
