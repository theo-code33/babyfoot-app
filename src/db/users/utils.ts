import { Games } from "../../utils";

export type UserDb = {
    uid: string;
    username: string;
    password: string;
    email: string;
    cover?: string;
    games?: Games;
    goals?: number;
}