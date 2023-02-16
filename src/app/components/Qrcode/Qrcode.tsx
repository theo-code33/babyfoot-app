import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../../context/userContext";

const Qrcode = () => {
    const {user} = useContext(UserContext)
    const {id} = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        console.log(user);
        
        if (user.uid !== "") {
            navigate(`/game/${id}/select-player`)
        }else{
            navigate(`/signin/${id}`)
        }
    },[])
    return ( 
        <div>
            <h1>Qrcode</h1>
        </div>
     );
}
 
export default Qrcode;