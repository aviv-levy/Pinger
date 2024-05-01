export interface User {
    _id?: string;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    token?: string;
    isAdmin?: boolean;
    status: 'Active' | 'Expired' | 'Blocked';
}


export interface LoginUser {
    email: string;
    password?: string;
}

export interface loading {
    isLoading: boolean,
    setIsLoading: Function
}

export interface PingData {
    host: string,
    engineer: boolean
}