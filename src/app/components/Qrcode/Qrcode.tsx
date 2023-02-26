import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../../context/userContext";

const Qrcode = () => {
    const {user} = useContext(UserContext)
    const {id} = useParams<{id: string}>();
    const token : string | null = localStorage.getItem("babytoken");
    const navigate = useNavigate();
    useEffect(() => {
        if (token) {
            navigate(`/game/${id}/select-player`)
        }else{
            navigate(`/signin/${id}`)
        }
    },[user])
    return ( 
        <>
        </>
     );
}
 
export default Qrcode;