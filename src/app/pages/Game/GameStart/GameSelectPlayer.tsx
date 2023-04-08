import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import { GameContext } from "../../../../context/gameContext"
import { UserContext } from "../../../../context/userContext"

import { updateGamePlayer } from "../../../../db/game/updateGame"
import { Position, Team, UpdatedUser, } from "../../../../db/utils"

import attaquantBlueCover from "../../../../assets/attaquant-blue.png"
import defenseurBlueCover from "../../../../assets/defenseur-blue.png"
import attaquantRedCover from "../../../../assets/attaquant-red.png"
import defenseurRedCover from "../../../../assets/defenseur-red.png"

const GameSelectPlayer = () => {
    const [attaquantBlue, setAttaquantBlue] = useState< UpdatedUser | null>(null)
    const [defenseurBlue, setDefenseurBlue] = useState< UpdatedUser | null>(null)
    const [attaquantRed, setAttaquantRed] = useState< UpdatedUser | null>(null)
    const [defenseurRed, setDefenseurRed] = useState< UpdatedUser | null>(null)
    const [mixteBlue, setMixteBlue] = useState< UpdatedUser | null>(null)
    const [mixteRed, setMixteRed] = useState< UpdatedUser | null>(null)
    const [isPlaying, setIsPlaying] = useState<boolean>(false)
    const [timeLeftRedirection, setTimeLeftRedirection] = useState<number>(5)

    const {user: userContext} = useContext(UserContext)
    const {game} = useContext(GameContext)
    const {id} = useParams<{id: string}>()
    const navigate = useNavigate()

    useEffect(() => {
        setIsPlaying(game.isPlaying)

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

    useEffect(() => {
        if(isPlaying === true) {
            const timer = setInterval(() => {
                if(timeLeftRedirection === 0) {
                    navigate('/game')
                }else{
                    setTimeLeftRedirection((timeLeftRedirection) => timeLeftRedirection - 1)
                }
            }, 1000)
            return () => {
                clearInterval(timer)
            }
        }
    }, [isPlaying, timeLeftRedirection])

    const handleCardClick = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) : Promise<void> => {

        const team = e.currentTarget.dataset.team as Team
        let position: Position | null = null
        if(e.currentTarget.dataset.position === 'Mixte' || e.currentTarget.dataset.position === 'Défenseur' || e.currentTarget.dataset.position === 'Attaquant'){
            position = e.currentTarget.dataset.position
        }

        const userGame: UpdatedUser = {
            userName: userContext.username,
            userId: userContext.uid as string,
            playerPoste: position as Position,
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
        <>
        <div className={isPlaying === true ? "container-choose disabled" : "container-choose"}>
            {
                game.blue.users && game.blue.users.map((user, index) => {
                    if(game.blue.users?.length === 1){
                        if(mixteBlue === null || mixteBlue.userId === "") {
                        return( <div key={index} className="choose-player-item blue-player" data-team="blue"  data-position="Mixte" onClick={handleCardClick} style={{background: `url(${attaquantBlueCover})`}}>
                            <h1>Mixte</h1>
                        </div>)
                        }else{
                        return ( <div key={index} className="choose-player-item blue-player disabled" style={{background: `url(${attaquantBlueCover})`}}>
                            <h1>Mixte</h1>
                        </div>)
                        }
                    }else{
                        if(index === 0) {
                            if(attaquantBlue === null || attaquantBlue.userId === "") {
                                return( <div data-team="blue" className="choose-player-item blue-player" data-position="Attaquant" onClick={handleCardClick} style={{background: `url(${attaquantBlueCover})`}}>
                                <h1>Attaquant</h1>
                            </div>)
                            }else{
                                return (<div className="choose-player-item blue-player disabled" style={{background: `url(${attaquantBlueCover})`}}>
                                    <h1>Attaquant</h1>
                                </div>)
                            }
                        }else{
                            if(defenseurBlue === null || defenseurBlue.userId === "") {
                                return( <div data-team="blue" className="choose-player-item blue-player" data-position="Défenseur" onClick={handleCardClick} style={{background: `url(${defenseurBlueCover})`}}>
                                <h1>Défenseur</h1>
                            </div>)
                            }else{
                                return (<div className="choose-player-item blue-player disabled" style={{background: `url(${defenseurBlueCover})`}}>
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
                        return( <div key={index} data-team="red" className="choose-player-item red-player" data-position="Mixte" onClick={handleCardClick} style={{background: `url(${attaquantRedCover})`}}>
                            <h1>Mixte</h1>
                        </div>)
                        }else{
                        return ( <div key={index} className="choose-player-item red-player disabled" style={{background: `url(${attaquantRedCover})`}}>
                            <h1>Mixte</h1>
                        </div>)
                        }
                    }else{
                        if(index === 0) {
                            if(attaquantRed === null || attaquantRed.userId === "") {
                                return( <div data-team="red" className="choose-player-item red-player" data-position="Attaquant" onClick={handleCardClick} style={{background: `url(${attaquantRedCover})`}}>
                                <h1>Attaquant</h1>
                            </div>)
                            }else{
                                return (<div className="choose-player-item red-player disabled" style={{background: `url(${attaquantRedCover})`}}>
                                    <h1>Attaquant</h1>
                                </div>)
                            }
                        }else{
                            if(defenseurRed === null || defenseurRed.userId === "") {
                                return( <div data-team="red" className="choose-player-item red-player" data-position="Défenseur" onClick={handleCardClick} style={{background: `url(${defenseurRedCover})`}}>
                                <h1>Défenseur</h1>
                            </div>)
                            }else{
                                return (<div className="choose-player-item red-player disabled" style={{background: `url(${defenseurRedCover})`}}>
                                    <h1>Défenseur</h1>
                                </div>)
                            }
                        }
                    }
                })
            }
        </div>
        {isPlaying == true
            && <div className="popup-game-is-playing">
                <h1>La Partie est lancée</h1>
                <h1>Que la force soit avec toi !</h1>
                <span>Redirection dans {timeLeftRedirection}</span>
            </div>
        }
        </>
     );
}
 
export default GameSelectPlayer;