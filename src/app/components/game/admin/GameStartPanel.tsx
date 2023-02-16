import { useContext, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GameContext } from "../../../../context/gameContext";
import { UserContext } from "../../../../context/userContext";
import { updateGameStatus } from "../../../../db/game/updateGame";
import QRCode from "qrcode";

const GameStartPanel = () => {
    const {id} = useParams();
    const {game} = useContext(GameContext);
    const {user} = useContext(UserContext);
    const navigate = useNavigate();
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const handleStartGame = async () => {
        await updateGameStatus(game, true)
        navigate(`/game/${id}`)
    }

    useEffect(() => {
        if(user.email !== "admin@admin.com"){
            navigate("/game")
        }else{

            QRCode.toCanvas(
                canvasRef.current,
                `https://babyfoot-app-24750.web.app/qr-code/${id}`,
                (error) => error && console.error(error)
            );
        }
    },[])

    return ( 
        <div>
            { game.blue && game.blue.users.map((player, index) => {
                    return (
                        <div key={index} className="player">
                            <div>{player.userName ? player.userName : `Player ${player.playerNumber}`}</div>
                        </div>
                    )
                })
            }
            <canvas ref={canvasRef} />
            { game.red && game.red.users.map((player, index) => {
                    return (
                        <div key={index} className="player">
                            <div>{player.userName ? player.userName : `Player ${player.playerNumber}`}</div>
                        </div>
                    )
                })
            }
            <button onClick={handleStartGame}>Play</button>
        </div>
     );
}
 
export default GameStartPanel;