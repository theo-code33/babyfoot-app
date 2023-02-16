import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { GameContext } from "../../../../context/gameContext"
import { UserContext } from "../../../../context/userContext"
import { updateGamePlayer } from "../../../../db/game/updateGame"
import { Team, UpdatedUser, UserGame } from "../../../../db/utils"
import { User } from "../../../../utils"

const GameSelectPlayer = () => {
    const [attaquantBlue, setAttaquantBlue] = useState< UpdatedUser | null>(null)
    const [defenseurBlue, setDefenseurBlue] = useState< UpdatedUser | null>(null)
    const [attaquantRed, setAttaquantRed] = useState< UpdatedUser | null>(null)
    const [defenseurRed, setDefenseurRed] = useState< UpdatedUser | null>(null)
    const [mixteBlue, setMixteBlue] = useState< UpdatedUser | null>(null)
    const [mixteRed, setMixteRed] = useState< UpdatedUser | null>(null)

    const {user: userContext} = useContext(UserContext)
    const {game, setGame} = useContext(GameContext)
    const {id} = useParams()

    const styleCard = {
        border: '1px solid white',
        fontWeight: 'bold',
        width: '49%',
        height: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white'
    } as React.CSSProperties

    const styleCardBlue = {
        ...styleCard,
        backgroundColor: 'blue',
        cursor: 'pointer',
    } as React.CSSProperties

    const styleCardRed = {
        ...styleCard,
        backgroundColor: 'red',
        cursor: 'pointer',
    } as React.CSSProperties

    const styleCardBlueDisabled = {
        ...styleCardBlue,
        opacity: 0.5
    } as React.CSSProperties

    const styleCardRedDisabled = {
        ...styleCardRed,
        opacity: 0.5
    } as React.CSSProperties

    const styleContainer = {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: '100vh',
        flexWrap: 'wrap'
    } as React.CSSProperties

    useEffect(() => {
        console.log("game => ", game);
        console.log("game.blue => ", game.blue.users);
        console.log("game.red => ", game.red.users);

        setAttaquantBlue(null)
        setDefenseurBlue(null)
        setMixteBlue(null)
        setAttaquantRed(null)
        setDefenseurRed(null)
        setMixteRed(null)
        
        if(game.blue.users) {
            game.blue.users.map(user => {
                if(user.playerPoste === 'Attaquant') {
                    setAttaquantBlue(user)
                }
                if(user.playerPoste === 'Défenseur') {
                    setDefenseurBlue(user)
                }
                if(user.playerPoste === 'Mixte') {
                    setMixteBlue(user)
                }
            })
        }
        if(game.red.users) {
            game.red.users.map(user => {
                if(user.playerPoste === 'Attaquant') {
                    console.log("user attaquant => ", user.playerNumber);
                    
                    setAttaquantRed(user)
                }
                if(user.playerPoste === 'Défenseur') {
                    console.log("user defenseur => ", user.playerNumber);
                    setDefenseurRed(user)
                }
                if(user.playerPoste === 'Mixte') {
                    console.log("user mixte => ", user.playerNumber);
                    setMixteRed(user)
                }
            })
        }
    }, [game])

    const handleCardClick = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {

        const team = e.currentTarget.dataset.team as Team
        const position = e.currentTarget.dataset.position

        const userGame: UpdatedUser = {
            userName: userContext.username,
            userId: userContext.uid as string,
            playerPoste: position as string,
        }
        
        if(team && position && id) {
            if(team === 'blue') {
                if(position === 'Attaquant') {
                    userGame.playerPoste = 'Attaquant'
                    setAttaquantBlue(userGame)
                }
                if(position === 'Défenseur') {
                    userGame.playerPoste = 'Défenseur'
                    setDefenseurBlue(userGame)
                }
                if(position === 'Mixte') {
                    userGame.playerPoste = 'Mixte'
                    setMixteBlue(userGame)
                }

            }else{
                if(position === 'Attaquant') {
                    userGame.playerPoste = 'Attaquant'
                    setAttaquantRed(userGame)
                }
                if(position === 'Défenseur') {
                    userGame.playerPoste = 'Défenseur'
                    setDefenseurRed(userGame)
                }
                if(position === 'Mixte') {
                    userGame.playerPoste = 'Mixte'
                    setMixteRed(userGame)
                }
            }
            await updateGamePlayer(userGame, position,team, +id, game)
        }
    }

    return ( 
        <div style={styleContainer}>
            {
                game.blue.users && game.blue.users.map((user, index) => {
                    if(game.blue.users?.length === 1){
                        if(mixteBlue === null || mixteBlue.userId === "") {
                        return( <div key={index} style={styleCardBlue} data-team="blue"  data-position="Mixte" onClick={handleCardClick}>
                            <h1>Mixte</h1>
                        </div>)
                        }else{
                        return ( <div key={index} style={styleCardBlueDisabled}>
                            <h1>Mixte</h1>
                        </div>)
                        }
                    }else{
                        if(index === 0) {
                            if(attaquantBlue === null || attaquantBlue.userId === "") {
                                return( <div style={styleCardBlue} data-team="blue"  data-position="Attaquant" onClick={handleCardClick}>
                                <h1>Attaquant</h1>
                            </div>)
                            }else{
                                return (<div style={styleCardBlueDisabled} >
                                    <h1>Attaquant</h1>
                                </div>)
                            }
                        }else{
                            if(defenseurBlue === null || defenseurBlue.userId === "") {
                                return( <div style={styleCardBlue} data-team="blue"  data-position="Défenseur" onClick={handleCardClick}>
                                <h1>Défenseur</h1>
                            </div>)
                            }else{
                                return (<div style={styleCardBlueDisabled} >
                                    <h1>Défenseur</h1>
                                </div>)
                            }
                        }
                    }
                    })
            }
            {
                game.red.users && game.red.users.map((user, index) => {
                    if(game.red.users?.length === 1){
                        if(mixteRed === null || mixteRed.userId === "") {
                        return( <div key={index} style={styleCardRed} data-team="red"  data-position="Mixte" onClick={handleCardClick}>
                            <h1>Mixte</h1>
                        </div>)
                        }else{
                        return ( <div key={index} style={styleCardRedDisabled}>
                            <h1>Mixte</h1>
                        </div>)
                        }
                    }else{
                        if(index === 0) {
                            if(attaquantRed === null || attaquantRed.userId === "") {
                                console.log("attaquant red=> ", attaquantRed);
                                return( <div style={styleCardRed} data-team="red"  data-position="Attaquant" onClick={handleCardClick}>
                                <h1>Attaquant</h1>
                            </div>)
                            }else{
                                console.log("attaquant red disabled=> ", attaquantRed);
                                return (<div style={styleCardRedDisabled} >
                                    <h1>Attaquant</h1>
                                </div>)
                            }
                        }else{
                            if(defenseurRed === null || defenseurRed.userId === "") {
                                console.log("defenseur red => ", defenseurRed);
                                return( <div style={styleCardRed} data-team="red"  data-position="Défenseur" onClick={handleCardClick}>
                                <h1>Défenseur</h1>
                            </div>)
                            }else{
                                console.log("defenseur red disabled=> ", defenseurRed);
                                return (<div style={styleCardRedDisabled} >
                                    <h1>Défenseur</h1>
                                </div>)
                            }
                        }
                    }
                    })
            }
        </div>
     );
}
 
export default GameSelectPlayer;