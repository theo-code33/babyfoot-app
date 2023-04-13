import { createContext, FC, useEffect, useState } from 'react';
import { getUserByUid } from '../db/users/read.users';
import { User } from '../utils';
import {Props, UserContextType} from './utils'
import { checkUser } from '../services/auth/auth.service';

export const userDefault: User = {
    uid: '',
    email: '',
    username: '',
    goals: 0,
    games: [],
    cover: '',
    isAdmin: false,
}

export const UserContext = createContext<UserContextType | null>(null)

export const UserContextProvider : FC<Props> = ({children}) => {
    const [user, setUser] = useState<User | undefined>(undefined)

    useEffect(() => {
        checkUser(setUser)
    }, [])

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}