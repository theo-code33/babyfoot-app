import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, InputLabel } from "@mui/material";

import { createGame } from "../../../../db/game/createGames";
import { CreateGame } from "./utils";

import background1v1 from "../../../../assets/background-1V1.svg";
import background2v2 from "../../../../assets/background-2V2.svg";
import background1v2 from "../../../../assets/background-1V2.svg";
import background2v1 from "../../../../assets/background-2V1.svg";
import checkmark from "../../../../assets/checkmark.svg";""
import backgroundBut3 from "../../../../assets/background-but-3.svg";
import backgroundBut5 from "../../../../assets/background-but-5.svg";
import backgroundBut10 from "../../../../assets/background-but-10.svg";
import backgroundBtn from "../../../../assets/background-btn-create.svg";

const GameFormCreate = () => {
    const [credentials, setCredentials] = useState<CreateGame>({
        maxScore: 3,
        member: '1v1'
    })

    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) : void => {
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
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) : Promise<void> => {
        e.preventDefault();
        try {
            const newGame = await createGame(credentials.maxScore, credentials.member);
            const { id } = newGame;
            navigate(`/game/${id}/start-game`);
            
        } catch (error) {
            console.log(error);
        }
    }

    const styleButton = {
        background: `url(${backgroundBtn})`,
    } as React.CSSProperties

    return ( 
        <Box component="form" onSubmit={handleSubmit} className="game-create-form_container">
            <h2>Nombre de joueurs :</h2>
            <Box className="game-create-form_row">
                <input type="radio" name="member" className="game-create-form_input" id="member1v1" value="1v1" defaultChecked onChange={handleChange}/>
                <InputLabel 
                htmlFor="member1v1"
                className="game-create-form_label"
                sx={{background: `url(${background1v1})`}}
                >
                    <span className="checkmark" style={{background: `url(${checkmark})`}}></span>
                    1v1
                </InputLabel>
                <input type="radio" name="member" className="game-create-form_input" id="member2v2" value="2v2" onChange={handleChange}/>
                <InputLabel
                htmlFor="member2v2"
                className="game-create-form_label"
                sx={{background: `url(${background2v2})`}}
                >
                    <span className="checkmark" style={{background: `url(${checkmark})`}}></span>
                    2v2
                </InputLabel>
                <input type="radio" name="member" className="game-create-form_input" id="member1v2" value="1v2" onChange={handleChange}/>
                <InputLabel
                htmlFor="member1v2"
                className="game-create-form_label"
                sx={{background: `url(${background1v2})`}}
                >
                    <span className="checkmark" style={{background: `url(${checkmark})`}}></span>
                    1v2
                </InputLabel>
                <input type="radio" name="member" className="game-create-form_input" id="member2v1" value="2v1" onChange={handleChange}/>
                <InputLabel
                htmlFor="member2v1"
                className="game-create-form_label"
                sx={{background: `url(${background2v1})`}}
                >
                    <span className="checkmark" style={{background: `url(${checkmark})`}}></span>
                    2v1
                </InputLabel>
            </Box>
            <h2>Nombre de joueurs :</h2>
            <Box className="game-create-form_row">
                <input type="radio" name="maxScore" id="maxScore3" className="game-create-form_input" value="3" defaultChecked onChange={handleChange}/>
                <InputLabel
                htmlFor="maxScore3"
                className="game-create-form_label"
                sx={{background: `url(${backgroundBut3})`}}
                >
                    <span className="checkmark" style={{background: `url(${checkmark})`}}></span>
                    3 Buts
                </InputLabel>
                <input type="radio" name="maxScore" id="maxScore5" className="game-create-form_input" value="5" onChange={handleChange}/>
                <InputLabel
                htmlFor="maxScore5"
                className="game-create-form_label"
                sx={{background: `url(${backgroundBut5})`}}
                >
                    <span className="checkmark" style={{background: `url(${checkmark})`}}></span>
                    5 Buts
                </InputLabel>
                <input type="radio" name="maxScore" id="maxScore10" className="game-create-form_input" value="10" onChange={handleChange}/>
                <InputLabel
                htmlFor="maxScore10"
                className="game-create-form_label"
                sx={{background: `url(${backgroundBut10})`}}
                >
                    <span className="checkmark" style={{background: `url(${checkmark})`}}></span>
                    10 Buts
                </InputLabel>
            </Box>
            <button type="submit" className="game-create-form_button" style={styleButton}>Créer la partie</button>
        </Box>
     );
}
 
export default GameFormCreate;