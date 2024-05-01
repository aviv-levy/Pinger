import axios from "axios";
import { LoginUser, PingData, User } from "./Interfaces";


//Test Url
// const serverUrl = 'http://localhost:4600/';

//Production Url
const serverUrl = 'http://192.168.111.252:4501/';


// User Login
export async function login(user: LoginUser): Promise<User> {
    try {
        const result = await axios.post<User>(serverUrl + 'login', user, {
            headers: {
                'Content-Type': 'application/json'
            },
        })
        return result.data;

    } catch (error: any) {
        const errorText = error.response.data
        throw errorText;
    }
}


// User Register
export async function addNewUser(user?: User): Promise<User> {
    try {
        const result = await axios.post<User>(serverUrl + 'register', user, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        return result.data;

    } catch (error: any) {
        const errorText = error.response.data
        throw errorText;
    }
}


// Send Reset Mail to reset account
export async function sendResetMail(email: string): Promise<void> {
    try {
        await axios.get(serverUrl + `resetAccount/${email}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })

    } catch (error: any) {
        const httpStatusCode = error.response.status
        throw httpStatusCode;
    }
}


// Send Reset Mail to reset account
export async function sendPing(ip: string): Promise<PingData> {
    try {
        const result = await axios.get(serverUrl + `ping/${ip}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        return result.data;
    } catch (error: any) {
        const httpStatusCode = error.response.status
        throw httpStatusCode;
    }
}