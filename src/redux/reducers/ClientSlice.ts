import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IClient } from '../interfaces/Client'
import { IGroup } from '../interfaces/Group';



const initialState: ClientState = {
    isLoading: false,
    client: {
        id: 1,
        firstName: "",
        secondName: "",
        phoneNumber : '',
        birthDay : new Date(),
        gender : 1,
        groups : []
    }
}

export interface ClientState {
    isLoading: boolean,
    client: IClient,
}




export const clientSlice = createSlice({
    name: "client",
    initialState,
    reducers: {
        takeClientInfo : (state, action : PayloadAction<IClient>) =>{
            state.client = action.payload
        },
        loadingInfo : (state) =>{
            state.isLoading = !state.isLoading
        },
        takeClientGroups : (state, action : PayloadAction<IGroup[]>) =>{
            state.client.groups = action.payload
        },
        clientEditInfo : (state, action : PayloadAction<IClient>) =>{
            state.client = action.payload
        },
        clientAddNewGroup : (state, action : PayloadAction<IGroup>) =>{
            state.client.groups.push(action.payload)
        },
        clientDeleteGroup : (state, action : PayloadAction<number>) =>{
            state.client.groups =  state.client.groups.filter((e)=>e.id!==action.payload)
        },
    },
})

export const { takeClientInfo, loadingInfo, takeClientGroups, clientEditInfo, clientAddNewGroup, clientDeleteGroup} = clientSlice.actions
export default clientSlice.reducer