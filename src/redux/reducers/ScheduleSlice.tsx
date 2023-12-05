import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IUser } from '../interfaces/User'
import { IUserRole } from '../interfaces/UserRole'
import axios from 'axios'
import { ISchedule } from '../interfaces/Schedule'



const initialState: ScheduleState = {
    isLoading: false,
    schedule: [],
}

export interface ScheduleState {
    isLoading : boolean,
    schedule : ISchedule[],
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

export const scheduleSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        takeSchedule: (state, schedules : PayloadAction<ISchedule[]>) => {
            console.log(schedules)
            state.schedule  = schedules.payload 
        },
        updateSchedule : (state, schedules : PayloadAction<ISchedule[]>) =>{
            state.schedule  = schedules.payload 
        },
    },
})

export const { takeSchedule,updateSchedule } = scheduleSlice.actions
export default scheduleSlice.reducer