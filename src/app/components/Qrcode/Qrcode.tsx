import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { UserContext } from "../../../context/userContext";
import { GameContext } from "../../../context/gameContext";

const Qrcode = () => {
    const userContext = useContext(UserContext);
    const {setGameId} = useContext(GameContext);
    const {id} = useParams<{id: string}>();
    const navigate = useNavigate();
    useEffect(() => {
        if(id === undefined) return navigate("/");
        if (userContext?.user !== undefined || userContext?.user !== null) {
            setGameId(parseInt(id))
            navigate(`/game/${id}/select-player`)
        }else{
            setGameId(parseInt(id))
            navigate(`/signin/${id}`)
        }
    },[userContext?.user])
    return ( 
        <>
        </>
     );
}
 
export default Qrcode;