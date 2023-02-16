import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GameContext } from "../../../../context/gameContext";

const UserGameConnect = () => {
    const [error, setError] = useState<boolean>(false);
    const [code, setCode] = useState<number>(0);
    const { game } = useContext(GameContext);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setError(false);
        setCode(parseInt(e.currentTarget.value));
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(code === +game.id){
            navigate(`/game/${game.id}/select-player`);
        }else{
            setError(true);
        }
        console.log(code);
    }
    return ( 
        <div>
            <h1>UserGameConnect</h1>
            <form onSubmit={handleSubmit}>
                <label>Code</label>
                <input type="number" name="code" id="code" onInput={handleChange}/>
                <button type="submit">Jouer</button>
                {error && <p>Code invalide</p>}
            </form>
        </div>
     );
}
 
export default UserGameConnect;