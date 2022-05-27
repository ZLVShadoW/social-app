import {PhotosType, profileAPI, ProfileUserType, ResultCodeType, usersAPI} from '../../api/api';
import {AppDispatchActionType, AppThunksType} from './actions-types';


export type PostType = {
    id: number;
    message: string;
    likesCount: number;
}

export type ProfilePageType = {
    posts: Array<PostType>;
    profile: ProfileUserType | null
    status: string | null
    // profile: Nullable<ProfileUserType>
    // status: Nullable<string>
}


let initialState: ProfilePageType = {
    posts: [
        {id: 1, message: 'first text', likesCount: 3},
        {
            id: 2,
            message: 'second much more biggest text, which was written by the person/user likes to write such messages very much. And we need to check how it will be rendered in the browser window. That is why I continue to enter text more and more. And now COPY PASTE second much more biggest text, which was written by the person/user likes to write such messages very much. And we need to check how it will be rendered in the browser window. That is why I continue to enter text more and more',
            likesCount: 5
        },
        {id: 3, message: 'third text written by introvert :)))', likesCount: 1}
    ],
    profile: null,
    status: null
}


const profileReducer = (state = initialState, action: ProfileReducerActionsType): ProfilePageType => {

    switch (action.type) {
        case 'PROFILE/ADD_POST': {
            const newPost: PostType = {
                id: 5,
                message: action.postMessage,
                likesCount: 0
            }
            return {
                ...state,
                posts: [...state.posts, newPost]
            }
        }
        case 'PROFILE/SET_USER_PROFILE': {
            return {...state, profile: action.profile}
        }
        case 'PROFILE/SET_STATUS': {
            return {...state, status: action.statusText}
        }
        case 'PROFILE/DELETE_POST': {
            return {
                ...state,
                posts: state.posts.filter(el => el.id !== action.id)
            }
        }
        case 'PROFILE/SAVE_PHOTO_SUCCESS': {
            return {
                ...state,
                //TODO проблема с null, пришлось поставить вск знак !
                profile: {
                    ...state.profile!,
                    photos: action.photos
                }
            }
        }
        default:
            return state
    }
}

export default profileReducer;


// ----------- actions -----------

export type ProfileReducerActionsType = AddPostACActionType
    | SetUserProfileActionType
    | SetStatusActionType
    | DeletePostActionType
    | SavePhotoSuccess

type AddPostACActionType = ReturnType<typeof addPostAC>
type SetUserProfileActionType = ReturnType<typeof setUserProfile>
type SetStatusActionType = ReturnType<typeof setStatus>
type DeletePostActionType = ReturnType<typeof deletePost>
type SavePhotoSuccess = ReturnType<typeof savePhotoSuccess>

export const addPostAC = (message: string) => {
    return {type: 'PROFILE/ADD_POST', postMessage: message} as const
}
export const setUserProfile = (profile: ProfileUserType) =>
    ({type: 'PROFILE/SET_USER_PROFILE', profile}) as const

export const setStatus = (statusText: string) =>
    ({type: 'PROFILE/SET_STATUS', statusText}) as const

export const deletePost = (id: number) =>
    ({type: 'PROFILE/DELETE_POST', id}) as const

export const savePhotoSuccess = (photos: PhotosType) =>
    ({type: 'PROFILE/SAVE_PHOTO_SUCCESS', photos}) as const


// ----------- Thunk -----------

export const getUserProfile = (userId: number): AppThunksType => async (dispatch: AppDispatchActionType) => {
    const res = await usersAPI.getProfile(userId)
    dispatch(setUserProfile(res.data))
}

export const getStatus = (userId: number): AppThunksType => async (dispatch: AppDispatchActionType) => {
    const res = await profileAPI.getStatus(userId)
    dispatch(setStatus(res.data))
}

export const updateStatus = (statusText: string): AppThunksType => async (dispatch: AppDispatchActionType) => {
    const res = await profileAPI.updateStatus(statusText)

    if (res.data.resultCode === ResultCodeType.success) {
        dispatch(setStatus(statusText))
    }
}

export const savePhoto = (photo: File) => async (dispatch: AppDispatchActionType) => {
    const formData = new FormData()
    formData.append('image', photo)

    const res = await profileAPI.savePhoto(formData)

    if (res.data.resultCode === ResultCodeType.success) {
        dispatch(savePhotoSuccess(res.data.data.photos))
    }
}