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
    isLoading: boolean,
    schedule: ISchedule[],
}



export const scheduleSlice = createSlice({
    name: "schedule",
    initialState,
    reducers: {
        takeSchedule: (state, schedules: PayloadAction<ISchedule[]>) => {
            state.schedule = schedules.payload
        },
        updateSchedule: (state, schedules: PayloadAction<ISchedule>) => {
            state.schedule.push(schedules.payload)
        },
        deleteSchedule: (state, action: PayloadAction<number>) => {
            state.schedule = state.schedule.filter(e=>e.id!==action.payload)
        }
    },
})

export const { takeSchedule, updateSchedule,deleteSchedule } = scheduleSlice.actions
export default scheduleSlice.reducer