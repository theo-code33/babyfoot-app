import { Action, Team } from "../../../../context/utils";

export type Props = {
    action: Action,
    handleClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, team: Team) => void
}