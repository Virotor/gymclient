import { IUserRole } from "./UserRole";

export interface IUser{
    name : string,
    email : string,
    password : string,
    jwtToken : string,
    userRoles : IUserRole[]
}