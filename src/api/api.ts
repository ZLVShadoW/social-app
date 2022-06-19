import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        // 'API-KEY': '7f6bcac5-aaf8-4abf-bee5-b24d79b89827'
        'API-KEY': process.env['REACT_APP_API_KEY'] as string
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
    updateStatus(statusText: string) {
        return instance.put<CommonResponseType>(`/profile/status`, {status: statusText})
    },
    savePhoto(photoFile: FormData) {
        return instance.put<CommonResponseType<{ photos: PhotosType }>>(`/profile/photo`, photoFile, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    updateProfileInfo(profileInfo: any) {
        return instance.put<CommonResponseType>('profile/', profileInfo)
    }
}

export const authAPI = {
    me() {
        return instance.get<CommonResponseType<MeResponseType>>(`auth/me`)
    },
    login(email: string, password: string, rememberMe: boolean = false, captcha?: string) {
        return instance.post<CommonResponseType<{userId: number}>>(`auth/login`, {email, password, rememberMe, captcha})
    },
    logout() {
        return instance.post<CommonResponseType>(`auth/logout`)
    }
}
export const securityAPI = {
    getCaptcha() {
        return instance.get<{url: string}>('security/get-captcha-url')
    }
}


// ----------- types -----------

export type Nullable<T> = T | null

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
    small: Nullable<string>
    large: Nullable<string>
}

export type UserType = {
    name: string
    id: number
    photos: PhotosType
    followed: boolean
    status: Nullable<string>
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
    //TODO как сделать правильно? без этой типизации в ProfileInfo нельзя после .map по объекту прокинуть динамически ключ
    [key: string]: Nullable<string>
    facebook: Nullable<string>
    github: Nullable<string>
    instagram: Nullable<string>
    mainLink: Nullable<string>
    twitter: Nullable<string>
    vk: Nullable<string>
    website: Nullable<string>
    youtube: Nullable<string>
}

export type ProfileUserType = {
    aboutMe: Nullable<string>
    contacts: ContactsType
    fullName: string
    lookingForAJob: boolean
    lookingForAJobDescription: Nullable<string>
    photos: PhotosType
    userId: number
}