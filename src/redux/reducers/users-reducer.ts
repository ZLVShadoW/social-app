import {ActionsType} from './actions-types';
import {usersAPI} from '../../api/api';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {AppStateType} from './index';


type PhotosType = {
    small: string | null
    large: string | null
}

export type UserType = {
    name: string
    id: number
    photos: PhotosType
    status: string
    followed: boolean
}

type UsersPageType = {
    users: Array<UserType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingProgress: Array<number | undefined>
}

let initialState: UsersPageType = {
    users: [],
    totalUsersCount: 0,
    pageSize: 3,
    currentPage: 1,
    isFetching: true,
    followingProgress: []
}

const usersReducer = (state = initialState, action: ActionsType): UsersPageType => {
    switch (action.type) {
        case 'FOLLOW': {
            return {
                ...state,
                users: state.users.map(user => user.id === action.userId ? {
                    ...user,
                    followed: true,
                } : user)
            }
        }
        case 'UNFOLLOW': {
            return {
                ...state,
                // users: state.users.map(user => user.id === action.userId ? {...user, followed: true} : user)
                users: state.users.map(user => {
                    if (user.id === action.userId) {
                        return {
                            ...user,
                            followed: false,
                        }
                    }
                    return user
                })
            }
        }
        case 'SET_USERS': {
            return {
                ...state,
                users: action.users
            }
        }
        case 'SET_TOTAL_USERS_COUNT': {
            return {
                ...state,
                totalUsersCount: action.count
            }
        }
        case 'SET_CURRENT_PAGE': {
            return {
                ...state,
                currentPage: action.currentPage
            }
        }
        case 'TOGGLE_IS_FETCHING': {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }
        case 'TOGGLE_IS_FOLLOWING_PROGRESS': {
            return {
                ...state,
                followingProgress: action.isFetching
                    ? [...state.followingProgress, action.userId]
                    : state.followingProgress.filter(el => el !== action.userId)
            }
        }
        default:
            return state
    }
}

export default usersReducer;

export const followSuccess = (userId: number) => {
    return {
        type: 'FOLLOW',
        userId: userId
    } as const
}
export const unfollowSuccess = (userId: number) => {
    return {
        type: 'UNFOLLOW',
        userId: userId
    } as const
}
export const setUsers = (users: Array<UserType>) => {
    return {
        type: 'SET_USERS',
        users
    } as const
}
export const setTotalUsersCount = (count: number) => {
    return {
        type: 'SET_TOTAL_USERS_COUNT',
        count
    } as const
}
export const setCurrentPage = (page: number) => {
    return {
        type: 'SET_CURRENT_PAGE',
        currentPage: page
    } as const
}


export const toggleIsFetching = (isFetching: boolean) => ({type: 'TOGGLE_IS_FETCHING', isFetching}) as const
export const toggleIsFollowingProgress = (userId: number, isFetching: boolean) => ({type: 'TOGGLE_IS_FOLLOWING_PROGRESS', userId, isFetching}) as const

// --- Thunk ---

type ThunkType = ThunkAction<void, AppStateType, unknown, ActionsType>
type ThunkDispatchActionType = ThunkDispatch<AppStateType, unknown, ActionsType>

export const getUsers = (currentPage: number, pageSize: number): ThunkType => (dispatch: ThunkDispatchActionType) => {
    dispatch(toggleIsFetching(true))
    usersAPI.getUsers(currentPage, pageSize)
        .then(data => {
            dispatch(setUsers(data.items))
            dispatch(setTotalUsersCount(data.totalCount))
            dispatch(toggleIsFetching(false))
        })
}

export const unfollow = (userId: number): ThunkType => (dispatch: ThunkDispatchActionType) => {
    dispatch(toggleIsFollowingProgress(userId, true))
    usersAPI.unfollow(userId).then(data => {
        if (data.resultCode === 0) {
            dispatch(unfollowSuccess(userId))
        }
        dispatch(toggleIsFollowingProgress(userId, false))
    })
}
export const follow = (userId: number): ThunkType => (dispatch: ThunkDispatchActionType) => {
    dispatch(toggleIsFollowingProgress(userId, true))
    usersAPI.follow(userId).then(data => {
        if (data.resultCode === 0) {
            dispatch(followSuccess(userId))
        }
        dispatch(toggleIsFollowingProgress(userId, false))
    })
}