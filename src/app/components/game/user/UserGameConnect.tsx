import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Button } from "@mui/material"

import { GameContext } from "../../../../context/gameContext";

import backgroundUser from "../../../../assets/background-user.svg"

const UserGameConnect = () => {
    const [error, setError] = useState<boolean>(false);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [code, setCode] = useState<number>(0);

    const { game } = useContext(GameContext);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) : void => {
        setError(false);
        setCode(parseInt(e.currentTarget.value));
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) : void => {
        e.preventDefault();
        if(code === +game.id){
            if(game.isPlaying === true){
                setIsPlaying(true);
            }else{
                navigate(`/game/${game.id}/select-player`);
            }
        }else{
            setError(true);
        }
    }

    const style : React.CSSProperties = {
        background: `url(${backgroundUser})`
    }

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