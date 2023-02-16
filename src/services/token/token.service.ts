import { Token } from './utils'
export const addToken = (token : Token) => {
    localStorage.setItem('babytoken', token)
}

export const getToken = () => {
    return localStorage.getItem('babytoken')
}

export const removeToken = () => {
    localStorage.removeItem('babytoken')
}