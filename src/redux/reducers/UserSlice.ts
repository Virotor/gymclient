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
        id : 0
    },
    jwtToken: "",
    isLoging : false,
}

export interface UserState {
    isLoading : boolean,
    searchValue? : string,
    user : ILogin,
    jwtToken : string,
    isLoging : boolean
}


// axios({
//   method: 'post',
//   url: '/user/12345',
//   data: {
//     firstName: 'Fred',
//     lastName: 'Flintstone'
//   }
// });
export const headers = {
    "Content-Type": "application/json",
    
  };

export interface ILogin  {
    username : string,
    password : string,
    jwtToken  : string,
    id : number
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        auth: (state, login : PayloadAction<ILogin>) => {
            console.log(login)
            state.user  = login.payload 
        },
        logOut : (state) =>{
            state.user = {username : "", password : "", jwtToken : "", id : 0}
        },
        requestId: (state,action : PayloadAction<number> ) =>{
            state.user.id = action.payload
        }
    },
})

export const { auth,logOut, requestId } = userSlice.actions
export default userSlice.reducer