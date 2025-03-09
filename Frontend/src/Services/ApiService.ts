import axios from "axios";
import { PingData } from "./Interfaces";


//Test Url
// const serverUrl = 'http://localhost:4600/';

//Production Url
const serverUrl = 'http://pinger.comax.co.il:4501/';


// Send ping to server
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

// Check all up hosts by gateway IP
export async function checkHosts(ip: string): Promise<number> {
    try {
        const result = await axios.get(serverUrl + `ping/check-hosts/${ip}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        
        return result.data.totalHostsUp;
    } catch (error: any) {
        const httpStatusCode = error.response.status
        throw httpStatusCode;
    }
}