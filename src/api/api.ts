import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': '7f6bcac5-aaf8-4abf-bee5-b24d79b89827'
    }
})

export const usersAPI = {
    getUsers(currentPage: number = 1, pageSize: number) {
        return instance.get<GetUsersResponseType>(`users?page=${currentPage}&count=${pageSize}`)
    },
    follow(id: number) {
        return instance.post<CommonResponseType>(`follow/${id}`)
    },
    unfollow(id: number) {
        return instance.delete<CommonResponseType>(`follow/${id}`)
    },
    getProfile(userId: number) {
        console.warn('--- CHANGE API ---')
        return profileAPI.getProfile(userId)
    }
}

export const profileAPI = {
    getProfile(userId: number) {
        return instance.get<ProfileUserType>(`profile/${userId}`)
    },
    getStatus(userId: number) {
        return instance.get<string>(`/profile/status/${userId}`)
    },
    // updateStatus(statusText: string | null) {
    updateStatus(statusText: string) {
        return instance.put<CommonResponseType>(`/profile/status`, {status: statusText})
    }
}

export const authAPI = {
    me() {
        return instance.get<CommonResponseType<MeResponseType>>(`auth/me`)
    },
    login(email: string, password: string, rememberMe: boolean = false) {
        return instance.post<CommonResponseType<{userId: number}>>(`auth/login`, {email, password, rememberMe})
    },
    logout() {
        return instance.post<CommonResponseType>(`auth/logout`)
    }
}


// ----------- types -----------

//TODO проверить типизацию для PUT и POST (может, видео 14 перед 15)
//getProfile пока без типизации


export enum ResultCodeType {
    success = 0,
    failed = 1,
    captcha = 10
}

type CommonResponseType<D = {}> = {
    data: D
    fieldsErrors: Array<string>
    messages: Array<string>
    resultCode: ResultCodeType
}

export type PhotosType = {
    small: string | null
    large: string | null
}

export type UserType = {
    name: string
    id: number
    photos: PhotosType
    followed: boolean
    status: string | null
    uniqueUrlName: null
}

type GetUsersResponseType = {
    error: null
    items: Array<UserType>
    totalCount: number
}

type MeResponseType = {
    email: string
    id: number
    login: string
}

export type ContactsType = {
    facebook: null | string
    github: null | string
    instagram: null | string
    mainLink: null | string
    twitter: null | string
    vk: null | string
    website: null | string
    youtube: null | string
}

export type ProfileUserType = {
    aboutMe: null | string
    contacts: ContactsType
    fullName: string
    lookingForAJob: boolean
    lookingForAJobDescription: null | string
    photos: PhotosType
    userId: number
}