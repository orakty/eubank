import {createContext} from 'react'

function roo(){

}

export const AuthContext = createContext({
    token:null,
    userId:null,
    login:roo,
    logout:roo,
    isAuthenticated:false
})