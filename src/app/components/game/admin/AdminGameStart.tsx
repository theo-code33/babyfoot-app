import { useNavigate } from "react-router-dom";

const AdminGameStart = () => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate("/game/create");
    }
    return ( 
        <div>
            <h1>AdminGameStart</h1>
            <button onClick={handleNavigate}>Create Game</button>
        </div>
     );
}
 
export default AdminGameStart;