import { useState } from "react";
import { createGame } from "../../../../db/game/createGames";
import { useNavigate } from "react-router-dom";

const GameFormCreate = () => {
    const [credentials, setCredentials] = useState({
        maxScore: 3,
    })

    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCredentials({
            maxScore: parseInt(e.currentTarget.value),
        })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const newGame = await createGame(credentials.maxScore);
            const { id } = newGame;
            navigate(`/game/${id}`);
            
        } catch (error) {
            
        }
    }
    return ( 
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="maxScore3">Goals 3</label>
                <input type="radio" name="maxScore" id="maxScore3" value="3" defaultChecked onChange={handleChange}/>
                <label htmlFor="maxScore5">Goals 5</label>
                <input type="radio" name="maxScore" id="maxScore5" value="5" onChange={handleChange}/>
                <label htmlFor="maxScore10">Goals 10</label>
                <input type="radio" name="maxScore" id="maxScore10" value="10" onChange={handleChange}/>
                <button type="submit">Créer la partie</button>
            </form>
        </div>
     );
}
 
export default GameFormCreate;