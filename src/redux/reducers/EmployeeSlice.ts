import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IClient } from '../interfaces/Client'
import { IGroup } from '../interfaces/Group';
import { IEmployee } from '../interfaces/Employee';



const initialState: EmployeeState = {
    isLoading: false,
    employee: {
        id: 1,
        firstName: "",
        secondName: "",
        phoneNumber : '',
        birthDay : new Date(),
        gender : 1,
        skills : "",
    }
}

export interface EmployeeState {
    isLoading: boolean,
    employee: IEmployee,
}




export const employeeSlice = createSlice({
    name: "employee",
    initialState,
    reducers: {
        takeEmployeeInfo : (state, action : PayloadAction<IEmployee>) =>{
            state.employee = action.payload
        },
        loadingInfo : (state) =>{
            state.isLoading = !state.isLoading
        },
        // takeClientGroups : (state, action : PayloadAction<IGroup[]>) =>{
        //     state.employee.groups = action.payload
        // },
        employeeEditInfo : (state, action : PayloadAction<IEmployee>) =>{
            state.employee = action.payload
        },
        // clientAddNewGroup : (state, action : PayloadAction<IGroup>) =>{
        //     state.employee.push(action.payload)
        // },
        // clientDeleteGroup : (state, action : PayloadAction<number>) =>{
        //     state.employee =  state.client.groups.filter((e)=>e.id!==action.payload)
        // },
    },
})

export const { takeEmployeeInfo, loadingInfo, employeeEditInfo} = employeeSlice.actions
export default employeeSlice.reducer