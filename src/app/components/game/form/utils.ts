import { GameMember } from "../../../../db/utils";

export type CreateGame = {
    maxScore: number;
    member: GameMember
}