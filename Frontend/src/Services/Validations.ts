import { User } from "./Interfaces";

const validEmail = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$');
const validPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;

export function isEmailValid(email: string): boolean {
    if (!validEmail.test(email))
        return true;

    return false;
}


export function isRegisterUserValid(user: User, setError: Function): boolean {
    const errArray: string[] = [];
    isTextValid(user.firstname) ? errArray[0] = 'First Name must have 2 or more letters' : errArray[0] = '';
    isTextValid(user.lastname) ? errArray[1] = 'Last Name must have 2 or more letters' : errArray[1] = '';
    isEmailValid(user.email) ? errArray[2] = 'Email is not valid' : errArray[2] = '';
    isPasswordValid(user.password) ? errArray[3] = 'Password is not valid' : errArray[4] = ''

    setError(errArray);

    if (errArray.find(err => err !== '') !== undefined)//Find if there is a validation error
        return false;

    return true;
}

export function isTextValid(text?: string): boolean {
    if (!text || text.length < 2)
        return true;

    return false;
}

export function isPasswordValid(password: string): boolean {
    if (!validPassword.test(password))
        return true;

    return false;
}