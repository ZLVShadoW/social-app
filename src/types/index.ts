export type Nullable<T> = T | null

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

export type ContactsType = {
    //TODO как сделать правильно? без этой типизации в ProfileInfo нельзя после .map по объекту прокинуть динамически ключ
    //ProfileData, 31 строка
    // [key: string]: Nullable<string>
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