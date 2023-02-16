import { createContext, FC, useEffect, useState } from 'react';
import { getUserByUid } from '../db/users/read.users';
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
    const fetchUser = async () => {
        const user = localStorage.getItem('token')
        if (user) {
            try {
                const userDb = await getUserByUid(user)
                if(userDb !== false && userDb !== true){
                    setUser(userDb)
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    useEffect(() => {
        fetchUser()
    }, [])

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}