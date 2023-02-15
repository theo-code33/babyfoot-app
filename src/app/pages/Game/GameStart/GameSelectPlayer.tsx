import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { GameContext } from "../../../../context/gameContext"
import { UserContext } from "../../../../context/userContext"
import { updateGamePlayer } from "../../../../db/game/updateGame"
import { Team, UserGame } from "../../../../db/utils"
import { User } from "../../../../utils"

const GameSelectPlayer = () => {
    const [attaquantBlue, setAttaquantBlue] = useState< User | UserGame | null>(null)
    const [defenseurBlue, setDefenseurBlue] = useState< User | UserGame | null>(null)
    const [attaquantRed, setAttaquantRed] = useState< User | UserGame | null>(null)
    const [defenseurRed, setDefenseurRed] = useState< User | UserGame | null>(null)
    const [mixteBlue, setMixteBlue] = useState< any | null>(null)
    const [mixteRed, setMixteRed] = useState< any | null>(null)

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
                    setAttaquantRed(user)
                }
                if(user.playerPoste === 'Défenseur') {
                    setDefenseurRed(user)
                }
                if(user.playerPoste === 'Mixte') {
                    setMixteRed(user)
                }
            })
        }
    }, [game])

    const handleCardClick = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {

        const team = e.currentTarget.dataset.team as Team
        const position = e.currentTarget.dataset.position

        const userGame = {
            playerPoste: "",
            userName: userContext.username,
            playerNumber: 1,
            userId: userContext.uid,
            goals: 0,
            postes: [
                {
                    name: "AG",
                    goals: 0,
                },
                {
                    name: "AC",
                    goals: 0,
                },
                {
                    name: "AD",
                    goals: 0,
                },
                {
                    name: "M",
                    goals: 0,
                },
                {
                    name: "DG",
                    goals: 0,
                },
                {
                    name: "DC",
                    goals: 0,
                },
                {
                    name: "DD",
                    goals: 0,
                },
                {
                    name: "G",
                    goals: 0,
                },
            ],
            fouls: [
                {
                    name: "rateau",
                    count: 0,
                },
                {
                    name: "pisette",
                    count: 0,
                },
                {
                    name: "roulette",
                    count: 0,
                },
            ],
            technicals: [
                {
                    name: "cendar",
                    count: 0,
                },
                {
                    name: "cendar",
                    count: 0,
                },
                {
                    name: "cendar",
                    count: 0,
                },
            ],
        } as UserGame
        
        if(team && position && id) {
            if(team === 'blue') {
                if(position === 'attaquant') {
                    userGame.playerPoste = 'Attaquant'
                    setAttaquantBlue(userGame)
                }
                if(position === 'defenseur') {
                    userGame.playerPoste = 'Défenseur'
                    setDefenseurBlue(userGame)
                }
                if(position === 'mixte') {
                    userGame.playerPoste = 'Mixte'
                    setMixteBlue(userGame)
                }

            }else{
                if(position === 'attaquant') {
                    userGame.playerPoste = 'Attaquant'
                    setAttaquantRed(userGame)
                }
                if(position === 'defenseur') {
                    userGame.playerPoste = 'Défenseur'
                    setDefenseurRed(userGame)
                }
                if(position === 'mixte') {
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
                        if(mixteBlue === null) {
                        return( <div key={index} style={styleCardBlue} data-team="blue"  data-position="mixte" onClick={handleCardClick}>
                            <h1>Mixte</h1>
                        </div>)
                        }else{
                        return ( <div key={index} style={styleCardBlueDisabled}>
                            <h1>Mixte</h1>
                        </div>)
                        }
                    }else{
                        if(index === 0) {
                            if(attaquantBlue === null) {
                                return( <div style={styleCardBlue} data-team="blue"  data-position="attaquant" onClick={handleCardClick}>
                                <h1>Attaquant</h1>
                            </div>)
                            }else{
                                return (<div style={styleCardBlueDisabled} >
                                    <h1>Attaquant</h1>
                                </div>)
                            }
                        }else{
                            if(defenseurBlue === null) {
                                return( <div style={styleCardBlue} data-team="blue"  data-position="defenseur" onClick={handleCardClick}>
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
                        if(mixteRed === null) {
                        return( <div key={index} style={styleCardRed} data-team="red"  data-position="mixte" onClick={handleCardClick}>
                            <h1>Mixte</h1>
                        </div>)
                        }else{
                        return ( <div key={index} style={styleCardRedDisabled}>
                            <h1>Mixte</h1>
                        </div>)
                        }
                    }else{
                        if(index === 0) {
                            if(attaquantRed === null) {
                                return( <div style={styleCardRed} data-team="red"  data-position="attaquant" onClick={handleCardClick}>
                                <h1>Attaquant</h1>
                            </div>)
                            }else{
                                return (<div style={styleCardRedDisabled} >
                                    <h1>Attaquant</h1>
                                </div>)
                            }
                        }else{
                            if(defenseurRed === null) {
                                return( <div style={styleCardRed} data-team="red"  data-position="defenseur" onClick={handleCardClick}>
                                <h1>Défenseur</h1>
                            </div>)
                            }else{
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