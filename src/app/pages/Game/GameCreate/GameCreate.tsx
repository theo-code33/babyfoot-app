import GameFormCreate from "../../../components/game/form/GameFormCreate";
import { Box } from "@mui/material";
import backgroundRules from "../../../../assets/background-rules.svg"
const GameCreate = () => {
    const style : React.CSSProperties = {
        background: `url(${backgroundRules})`
    }
    return ( 
        <Box sx={style} className="game-create_container">
            <h1>Création de la partie</h1>
            <GameFormCreate/>
        </Box>
     );
}
 
export default GameCreate;