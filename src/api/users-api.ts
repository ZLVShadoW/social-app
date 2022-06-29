import { UserType } from '../types';
import {CommonResponseType, instance} from './api';

export const usersAPI = {
    getUsers(currentPage: number = 1, pageSize: number) {
        return instance.get<GetUsersResponseType>(`users?page=${currentPage}&count=${pageSize}`)
    },
    follow(id: number) {
        return instance.post<CommonResponseType>(`follow/${id}`)
    },
    unfollow(id: number) {
        return instance.delete<CommonResponseType>(`follow/${id}`)
    }
}


// type

type GetUsersResponseType = {
    error: null
    items: Array<UserType>
    totalCount: number
}