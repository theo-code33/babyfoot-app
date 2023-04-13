import { User } from "../../../utils";

export type Props = {
    user: User | undefined;
    children: React.ReactNode;
    onlyAdmin?: boolean;
}