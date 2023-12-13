import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IUser } from '../interfaces/User'
import { IUserRole } from '../interfaces/UserRole'
import axios from 'axios'



const initialState: UserState = {
    isLoading: false,
    searchValue: "",
    user: {
        username : "",
        password : "",
        jwtToken  : "",
        id : 0,
        role : undefined
    },
    jwtToken: "",
}

export interface UserState {
    isLoading : boolean,
    searchValue? : string,
    user : ILogin,
    jwtToken : string,
}

export type role = 'role_user' | 'role_admin' | 'role_trainer' | undefined

export const headers = {
    "Content-Type": "application/json",
    
  };

export interface ILogin  {
    username : string,
    password : string,
    jwtToken  : string,
    role : role
    id : number
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        auth: (state, action : PayloadAction<ILogin>) => {
            state.user  = action.payload 
        },
        logOut : (state) =>{
            state.user = {username : "", password : "", jwtToken : "", id : 0, role : undefined}
        },
        requestId: (state,action : PayloadAction<number> ) =>{
            state.user.id = action.payload
        },
  
    },
})

export const { auth,logOut, requestId } = userSlice.actions
export default userSlice.reducer