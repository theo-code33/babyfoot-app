import { useState } from "react";
import { createGame } from "../../../../db/game/createGames";
import { useNavigate } from "react-router-dom";
import { GameMember } from "../../../../db/utils";
import { Box, FormControl, InputLabel, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import background1v1 from "../../../../assets/background-1V1.svg";
import background2v2 from "../../../../assets/background-2V2.svg";
import background1v2 from "../../../../assets/background-1V2.svg";
import background2v1 from "../../../../assets/background-2V1.svg";
import checkmark from "../../../../assets/checkmark.svg";
import backgroundBut3 from "../../../../assets/background-but-3.svg";
import backgroundBut5 from "../../../../assets/background-but-5.svg";
import backgroundBut10 from "../../../../assets/background-but-10.svg";
import backgroundBtn from "../../../../assets/background-button-create.svg";

const GameFormCreate = () => {
    const [credentials, setCredentials] = useState({
        maxScore: 3 as number,
        member: '1v1' as GameMember
    })

    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.currentTarget.name === 'maxScore'){
            setCredentials({
                ...credentials,
                [e.currentTarget.name]: parseInt(e.currentTarget.value),
            })
        }else{
            setCredentials({
                ...credentials,
                [e.currentTarget.name]: e.currentTarget.value,
            })
        }
        console.log(credentials);
        
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const newGame = await createGame(credentials.maxScore, credentials.member);
            const { id } = newGame;
            navigate(`/game/${id}/start-game`);
            
        } catch (error) {
            console.log(error);
        }
    }

    const styleForm = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        width: "90%",
    } as React.CSSProperties

    const styleInput = {
        visibility: "hidden",
        width: "0",
        margin: "0",
    } as React.CSSProperties

    const styleInputLabel = {
        width: "24%",
        height: "150px",
        textAlign: "center",
        backgroundPosition: "center !important",
        backgroundSize: "cover !important",
        backgroundRepeat: "no-repeat",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        fontSize: "60px",
        textTransform: "uppercase",
        border: "3px solid transparent",
        margin: "0 10px",
        "&:first-of-type": {
            margin: "0 10px 0 0",
        }
    } as React.CSSProperties

    const styleContainer = {
        width: "100%",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
    } as React.CSSProperties

    const styleButton = {
        background: `url(${backgroundBtn})`,
    } as React.CSSProperties

    return ( 
        <Box component="form" onSubmit={handleSubmit} sx={styleForm}>
            <h2>Nombre de joueurs :</h2>
            <Box sx={styleContainer}>
                <input type="radio" name="member" className="create-input" id="member1v1" value="1v1" defaultChecked onChange={handleChange} style={styleInput}/>
                <InputLabel 
                htmlFor="member1v1"
                sx={{...styleInputLabel, background: `url(${background1v1})`}}
                >
                    <span className="checkmark" style={{background: `url(${checkmark})`}}></span>
                    1v1
                </InputLabel>
                <input type="radio" name="member" className="create-input" id="member2v2" value="2v2" onChange={handleChange} style={styleInput}/>
                <InputLabel
                htmlFor="member2v2"
                sx={{...styleInputLabel, background: `url(${background2v2})`}}
                >
                    <span className="checkmark" style={{background: `url(${checkmark})`}}></span>
                    2v2
                </InputLabel>
                <input type="radio" name="member" className="create-input" id="member1v2" value="1v2" onChange={handleChange} style={styleInput}/>
                <InputLabel
                htmlFor="member1v2"
                sx={{...styleInputLabel, background: `url(${background1v2})`}}
                >
                    <span className="checkmark" style={{background: `url(${checkmark})`}}></span>
                    1v2
                </InputLabel>
                <input type="radio" name="member" className="create-input" id="member2v1" value="2v1" onChange={handleChange} style={styleInput}/>
                <InputLabel
                htmlFor="member2v1"
                sx={{...styleInputLabel, background: `url(${background2v1})`}}
                >
                    <span className="checkmark" style={{background: `url(${checkmark})`}}></span>
                    2v1
                </InputLabel>
            </Box>
            <h2>Nombre de joueurs :</h2>
            <Box sx={styleContainer}>
                <input type="radio" name="maxScore" id="maxScore3" className="create-input" value="3" defaultChecked onChange={handleChange} style={styleInput}/>
                <InputLabel
                htmlFor="maxScore3"
                sx={{...styleInputLabel, background: `url(${backgroundBut3})`}}
                >
                    <span className="checkmark" style={{background: `url(${checkmark})`}}></span>
                    3 Buts
                </InputLabel>
                <input type="radio" name="maxScore" id="maxScore5" className="create-input" value="5" onChange={handleChange} style={styleInput}/>
                <InputLabel
                htmlFor="maxScore5"
                sx={{...styleInputLabel, background: `url(${backgroundBut5})`}}
                >
                    <span className="checkmark" style={{background: `url(${checkmark})`}}></span>
                    5 Buts
                </InputLabel>
                <input type="radio" name="maxScore" id="maxScore10" className="create-input" value="10" onChange={handleChange} style={styleInput}/>
                <InputLabel
                htmlFor="maxScore10"
                sx={{...styleInputLabel, background: `url(${backgroundBut10})`}}
                >
                    <span className="checkmark" style={{background: `url(${checkmark})`}}></span>
                    10 Buts
                </InputLabel>
            </Box>
            <button type="submit" className="create-btn" style={styleButton}>Créer la partie</button>
        </Box>
     );
}
 
export default GameFormCreate;