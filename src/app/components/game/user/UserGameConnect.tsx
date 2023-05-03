import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Button } from "@mui/material"

import { GameContext } from "../../../../context/gameContext";

import backgroundUser from "../../../../assets/background-user.svg"

const UserGameConnect = () => {
    const [error, setError] = useState<boolean>(false);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [code, setCode] = useState<number>(0);

    const { game, setGame, gameId, setGameId } = useContext(GameContext);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) : void => {
        setError(false);
        setIsPlaying(false);
        setCode(parseInt(e.currentTarget.value));
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) : void => {
        e.preventDefault();
        setError(false);
        setIsPlaying(false);
        setGameId(code);
    }

    const style : React.CSSProperties = {
        background: `url(${backgroundUser})`
    }

    useEffect(() => {
        if(game !== undefined){
            if(game.isPlaying === true){
                setIsPlaying(true);
                setError(false);
                setGame(undefined)
            }else{
                navigate(`/game/${game.id}/select-player`);
                console.log("game is not playing: ", game);
            }
        }else if(gameId !== 0){
            setError(true);
        }
    }, [gameId, game])

    return ( 
        <Box sx={style} className="user-game-connect_container">
            <Box component="form" onSubmit={handleSubmit} className="user-game-connect_form">
                <TextField
                type="number"
                name="email"
                id="email"
                placeholder="Game Pin"
                variant="outlined"
                onChange={handleChange}
                className="user-game-connect_input"
                />
                {isPlaying && <p className="user-game-connect_error">La partie est déjà en cours</p>}
                {error && <p className="user-game-connect_error">Code invalide</p>}
                <Button type="submit" variant="contained" className="user-game-connect_button">Rejoindre</Button>
            </Box>
        </Box>
     );
}
 
export default UserGameConnect;