import { useContext, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box } from "@mui/material";

import { GameContext } from "../../../../context/gameContext";
import { UserContext } from "../../../../context/userContext";
import { UserContextType } from "../../../../context/utils";

import { updateGameStatus } from "../../../../db/game/updateGame";

import QRCode from "qrcode";

import backgroundGameStartPanel from "../../../../assets/background-start-game.svg";

const GameStartPanel = () => {
  const { id } = useParams<{id: string}>();
  const { game } = useContext(GameContext);
  const { user } = useContext(UserContext) as UserContextType;
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleStartGame = async (): Promise<void> => {
    await updateGameStatus(game, true);
    navigate(`/game/${id}`);
  };

  useEffect(() => {
    if (user && user.email !== "admin@admin.com") {
      navigate("/game");
    } else {
      QRCode.toCanvas(
        canvasRef.current,
        `https://babyfoot-app-24750.web.app/qr-code/${id}`,
        (error) => error && console.error(error)
      );
    }
  }, []);

  const style: React.CSSProperties = {
    background: `url(${backgroundGameStartPanel})`,
  }

  return (
    <Box sx={style} className="container-start-game">
        <Box className="content-start-game">
            <Box className="container-player">
                {game.blue &&
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
                    https://babyfoot-app-24750.web.app/signin/{id}
                </p>
            </Box>
            <Box className="container-player red-container">
                {game.red &&
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
      <button onClick={handleStartGame} className="button-start">Start !</button>
    </Box>
  );
};

export default GameStartPanel;
