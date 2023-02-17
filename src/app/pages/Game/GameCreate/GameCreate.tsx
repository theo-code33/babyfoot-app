import GameFormCreate from "../../../components/game/form/GameFormCreate";
import { Box } from "@mui/material";
import backgroundRules from "../../../../assets/background-rules.svg"
const GameCreate = () => {
    const style = {
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        backgroundSize: "cover !important",
        backgroundRepeat: "no-repeat",
        background: `url(${backgroundRules})`
    } as React.CSSProperties
    const styleH1 = {
        width: "90%",
        fontSize: '80px',
        marginTop: "0px",
        marginBottom: "20px",
    }
    return ( 
        <Box sx={style}>
            <h1 style={styleH1}>Création de la partie</h1>
            <GameFormCreate/>
        </Box>
     );
}
 
export default GameCreate;