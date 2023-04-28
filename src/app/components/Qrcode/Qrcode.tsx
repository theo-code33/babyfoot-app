import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { UserContext } from "../../../context/userContext";

const Qrcode = () => {
    const userContext = useContext(UserContext);
    const {id} = useParams<{id: string}>();
    const navigate = useNavigate();
    useEffect(() => {
        if (userContext?.user !== undefined || userContext?.user !== null) {
            navigate(`/game/${id}/select-player`)
        }else{
            navigate(`/signin/${id}`)
        }
    },[userContext?.user])
    return ( 
        <>
        </>
     );
}
 
export default Qrcode;