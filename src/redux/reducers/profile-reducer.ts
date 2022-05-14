import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {AppStateType} from './index';
import {ProfileUserType, profileAPI, ResultCodeType, usersAPI} from '../../api/api';

export type PostType = {
    id: number;
    message: string;
    likesCount: number;
}
export type ProfilePageType = {
    posts: Array<PostType>;
    profile: ProfileUserType | null
    status: string | null
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

type ProfileReducerActionsType = AddPostACActionType
    | SetUserProfileActionType
    | SetStatusActionType

const profileReducer = (state = initialState, action: ProfileReducerActionsType): ProfilePageType => {

    switch (action.type) {
        case 'PROFILE/ADD-POST': {
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
        default:
            return state
    }
}

export default profileReducer;


// ----------- actions -----------


type AddPostACActionType = ReturnType<typeof addPostAC>
type SetUserProfileActionType = ReturnType<typeof setUserProfile>
type SetStatusActionType = ReturnType<typeof setStatus>

export const addPostAC = (message: string) => {
    return {type: 'PROFILE/ADD-POST', postMessage: message} as const
}
export const setUserProfile = (profile: ProfileUserType) => ({type: 'PROFILE/SET_USER_PROFILE', profile}) as const
export const setStatus = (statusText: string | null) => ({type: 'PROFILE/SET_STATUS', statusText}) as const


// ----------- Thunk -----------


type ThunkType = ThunkAction<void, AppStateType, unknown, ProfileReducerActionsType>
type ThunkDispatchActionType = ThunkDispatch<AppStateType, unknown, ProfileReducerActionsType>

export const getUserProfile = (userId: number): ThunkType => (dispatch: ThunkDispatchActionType) => {
    usersAPI.getProfile(userId)
        .then(response => dispatch(setUserProfile(response.data)))
}
export const getStatus = (userId: number): ThunkType => (dispatch: ThunkDispatchActionType) => {
    profileAPI.getStatus(userId)
        .then(res => dispatch(setStatus(res.data)))
}
export const updateStatus = (statusText: string | null): ThunkType => (dispatch: ThunkDispatchActionType) => {
    profileAPI.updateStatus(statusText)
        .then(res => {
            if (res.data.resultCode === ResultCodeType.success) {
                dispatch(setStatus(statusText))
            }
        })
}