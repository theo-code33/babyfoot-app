import { useState } from "react";
import { createGame } from "../../../../db/game/createGames";
import { useNavigate } from "react-router-dom";
import { GameMember } from "../../../../db/utils";

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
                
                <label htmlFor="member1v1">1v1</label>
                <input type="radio" name="member" id="member1v1" value="1v1" defaultChecked onChange={handleChange}/>
                <label htmlFor="member2v2">2v2</label>
                <input type="radio" name="member" id="member2v2" value="2v2" onChange={handleChange}/>
                <label htmlFor="member1v2">1v2</label>
                <input type="radio" name="member" id="member1v2" value="1v2" onChange={handleChange}/>
                <label htmlFor="member2v1">2v1</label>
                <input type="radio" name="member" id="member2v1" value="2v1" onChange={handleChange}/>
                <button type="submit">Créer la partie</button>
            </form>
        </div>
     );
}
 
export default GameFormCreate;