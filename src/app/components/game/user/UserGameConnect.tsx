import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GameContext } from "../../../../context/gameContext";
import { Box, TextField, Button } from "@mui/material"
import backgroundUser from "../../../../assets/background-user.svg"

const UserGameConnect = () => {
    const [error, setError] = useState<boolean>(false);
    const [code, setCode] = useState<number>(0);
    const { game } = useContext(GameContext);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setError(false);
        setCode(parseInt(e.currentTarget.value));
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(code === +game.id){
            navigate(`/game/${game.id}/select-player`);
        }else{
            setError(true);
        }
        console.log(code);
    }

    const style = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
        backgroundSize: "cover !important",
        backgroundRepeat: "no-repeat",
        background: `url(${backgroundUser})`
    } as React.CSSProperties

    const styleForm = {
        width: "85%",
    } as React.CSSProperties

    const styleInput = {
        width: "100%",
        border: "1px solid white",
        color: "white",
        "& input": {
            color: "white",
            fontSize: "30px",
            textAlign: "center",
            "&::placeholder": {
                textTransform: "uppercase",
            }
        }
    } as React.CSSProperties

    const styleButton = {
        width: "100%",
        padding: "10px",
        marginTop: "45px",
        backgroundColor: "#0A2334",
        color: "white",
        borderRadius: 0,
        fontSize: "42px",
        letterSpacing: "-2px",
        fontFamily: "Poppins",
        "&:hover": {
            backgroundColor: "#0A2334",
            opacity: 0.8
        }
    } as React.CSSProperties

    const styleError = {
        fontFamily: "Poppins",
        textAlign: "center",
        color: "red",
        margin: 0,
    } as React.CSSProperties

    return ( 
        <Box sx={style}>
            <Box component="form" onSubmit={handleSubmit} sx={styleForm}>
                <TextField
                type="number"
                name="email"
                id="email"
                placeholder="Game Pin"
                variant="outlined"
                onChange={handleChange}
                sx={styleInput}
                />
                {error && <p style={styleError}>Code invalide</p>}
                <Button type="submit" variant="contained" sx={styleButton}>Rejoindre</Button>
            </Box>
        </Box>
     );
}
 
export default UserGameConnect;