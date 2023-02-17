import { useState } from "react";
import { createGame } from "../../../../db/game/createGames";
import { useNavigate } from "react-router-dom";
import { GameMember } from "../../../../db/utils";
import { Box, FormControl, InputLabel, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import background1v1 from "../../../../assets/background-1V1.svg";

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
        alignItems: "center",
    } as React.CSSProperties

    const styleInput = {
        visibility: "hidden",
    } as React.CSSProperties

    const styleInputLabel = {
        width: "24%",
        height: "200px",
        textAlign: "center",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
    } as React.CSSProperties

    return ( 
        <Box component="form" onSubmit={handleSubmit} sx={styleForm}>
            {/* <Box>
                <InputLabel htmlFor="member1v1">1v1</InputLabel>
                <input type="radio" name="member" id="member1v1" value="1v1" defaultChecked onChange={handleChange}/>
                <label htmlFor="member2v2">2v2</label>
                <input type="radio" name="member" id="member2v2" value="2v2" onChange={handleChange}/>
                <label htmlFor="member1v2">1v2</label>
                <input type="radio" name="member" id="member1v2" value="1v2" onChange={handleChange}/>
                <label htmlFor="member2v1">2v1</label>
                <input type="radio" name="member" id="member2v1" value="2v1" onChange={handleChange}/>
            </Box> */}
            <FormControl>
                <FormLabel id="memberLabel">Nombre de joueurs :</FormLabel>
                <RadioGroup
                    aria-labelledby="memberLabel"
                    defaultValue="1v1"
                    name="member"
                    onChange={handleChange}
                >
                    <FormControlLabel value="1v1" control={<Radio sx={styleInput}/>} label="1v1" />
                    <FormControlLabel value="2v2" control={<Radio sx={styleInput}/>} label="2v2" />
                    <FormControlLabel value="1v2" control={<Radio sx={styleInput}/>} label="1v2" />
                    <FormControlLabel value="2v1" control={<Radio sx={styleInput}/>} label="2v1" />
                </RadioGroup>
            </FormControl>
            <Box>
                <label htmlFor="maxScore3">Buts 3</label>
                <input type="radio" name="maxScore" id="maxScore3" value="3" defaultChecked onChange={handleChange}/>
                <label htmlFor="maxScore5">Buts 5</label>
                <input type="radio" name="maxScore" id="maxScore5" value="5" onChange={handleChange}/>
                <label htmlFor="maxScore10">Buts 10</label>
                <input type="radio" name="maxScore" id="maxScore10" value="10" onChange={handleChange}/>
            </Box>
            <button type="submit">Créer la partie</button>
        </Box>
     );
}
 
export default GameFormCreate;