import {ActionsType} from './actions-types';

export type PostType = {
    id: number;
    message: string;
    likesCount: number;
}
export type ProfilePageType = {
    posts: Array<PostType>;
    profile: ProfileUserType | null
}

//--------------------------------------------------------------

type ContactsProfileType = {
    facebook: string
    github: string
    instagram: string
    mainLink: null,
    twitter: string
    vk: string
    website: null
    youtube: null
}

type PhotosProfileType = {
    small: string | null
    large: string | null
}

export type ProfileUserType = {
    aboutMe: string
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsProfileType
    photos: PhotosProfileType
}

///------------------------------------------------------------


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
    profile: null
}

const profileReducer = (state = initialState, action: ActionsType): ProfilePageType => {

    switch (action.type) {
        case 'ADD-POST': {
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
        case 'SET_USER_PROFILE': {
            return {...state, profile: action.profile}
        }
        default:
            return state
    }
}

export default profileReducer;

export const addPostAC = (message: string) => {
    return {type: 'ADD-POST', postMessage: message} as const
}

export const setUserProfile = (profile: ProfileUserType) => ({type: 'SET_USER_PROFILE', profile}) as const