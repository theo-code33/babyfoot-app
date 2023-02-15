import { createContext, FC, useState } from 'react';
import { User } from '../utils';
import {Props, UserContextType} from './utils'

export const userDefault: User = {
    uid: '',
    email: '',
    username: '',
    goals: 0,
    games: [],
    cover: '',
}

export const UserContext = createContext<UserContextType>({
    user: userDefault,
    setUser: () => {}
})

export const UserContextProvider : FC<Props> = ({children}) => {
    const [user, setUser] = useState<User>(userDefault)

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}