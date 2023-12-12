
import { ILogin } from '../reducers/UserSlice';




export function authUser(password: string, username: string, jwtToken: string, role : string) {
    console.log(password,username,jwtToken)
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);
    localStorage.setItem('token', jwtToken.toString())
    localStorage.setItem('role', role)
}



export function isAuth() {
    let keys = Object.keys(localStorage);
    for (let key of keys) {
        if (key === 'username') {
            return true;
        }
    }
    return false;
}

export function getUser() {
    let user: ILogin = {
        username: localStorage.username,
        password: localStorage.password,
        jwtToken: localStorage.token,
        id : 0,
        role : localStorage.role,
    }
    return user
}


export function logOutUser() {
    delete localStorage.username;
    delete localStorage.password;
    delete localStorage.token;
    delete localStorage.role;
}