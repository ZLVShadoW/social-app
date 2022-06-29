import { Nullable } from '../types';
import {CommonResponseType, instance} from './api';

export const authAPI = {
    me() {
        return instance.get<CommonResponseType<MeResponseType>>(`auth/me`)
    },
    login(
        email: string, password: string, rememberMe: boolean = false,
        captcha: Nullable<string> = null
    ) {
        return instance.post<CommonResponseType<{ userId: number }>>(`auth/login`, {
            email,
            password,
            rememberMe,
            captcha
        })
    },
    logout() {
        return instance.post<CommonResponseType>(`auth/logout`)
    }
}


// type

type MeResponseType = {
    email: string
    id: number
    login: string
}