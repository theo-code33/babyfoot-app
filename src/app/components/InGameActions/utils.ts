import { ActionType, Team } from "../../../context/utils"

export type Props = {
    setNewAction: (type: ActionType, team: Team) => void,
    team: Team
}