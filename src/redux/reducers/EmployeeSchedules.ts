import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IUser } from '../interfaces/User'
import { IUserRole } from '../interfaces/UserRole'
import axios from 'axios'
import { ISchedule } from '../interfaces/Schedule';
import { EmployeeSchedule } from '../../components/Client/Record/EmployeeSchedule';
import { IEmployee } from '../interfaces/Employee';



const initialState: EmployeeScheduleState = {
    isLoading: false,
    employeeSchedule: new Map(),
}

export interface EmployeeSchedulePairs  {
    schedule : ISchedule[],
    employee : IEmployee
}

export interface EmployeeScheduleState {
    isLoading: boolean,
    employeeSchedule: Map<number, ISchedule[]>,
}



export const employeeScheduleSlice = createSlice({
    name: "employeeSchedule",
    initialState,
    reducers: {
        addEmployeeSchedule: (state, action: PayloadAction<{schedule : ISchedule[], id : number}>) => {
            state.employeeSchedule.set(action.payload.id,action.payload.schedule)
        },
        updateEmployeeSchedule: (state, action: PayloadAction<{schedule : ISchedule, id : number}>) => {
            state.employeeSchedule.set(action.payload.id, [...state.employeeSchedule.get(action.payload.id)?.filter((e)=>e.id!==action.payload.schedule.id) as ISchedule[], (action.payload.schedule)] )
        },
        deleteEmployeeSchedule: (state, action: PayloadAction<{schedule : ISchedule, id : number}>) => {
            state.employeeSchedule.set(action.payload.id,state.employeeSchedule.get(action.payload.id)?.filter((e)=>e.id!==action.payload.schedule.id) as ISchedule[])
        }
    },
})

export const { addEmployeeSchedule, updateEmployeeSchedule,deleteEmployeeSchedule } = employeeScheduleSlice.actions
export default employeeScheduleSlice.reducer