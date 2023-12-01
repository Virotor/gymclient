import { IGroup } from "./Group";

export interface IClient {
    id: number,
    firstName: string,
    secondName: string,
    phoneNumber: string,
    birthDay: Date,
    gender: number,
    groups : IGroup[]

}