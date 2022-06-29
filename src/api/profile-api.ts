import {PhotosType, ProfileUserType } from '../types';
import {CommonResponseType, instance} from './api';

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
    updateProfileInfo(profileInfo: ProfileUserType) {
        return instance.put<CommonResponseType>('profile/', profileInfo)
    }
}