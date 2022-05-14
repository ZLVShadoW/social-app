import {ResultCodeType, UserType, usersAPI} from '../../api/api';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {AppStateType} from './index';


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

type UsersReducerActionType = FollowSuccessActionType
    | UnfollowSuccessActionType
    | SetUsersActionType
    | SetTotalUsersCountActionType
    | SetCurrentPageActionType
    | ToggleIsFetchingActionType
    | ToggleIsFollowingProgressActionType

const usersReducer = (state = initialState, action: UsersReducerActionType): UsersPageType => {
    switch (action.type) {
        case 'USERS/FOLLOW': {
            return {
                ...state,
                users: state.users.map(user => user.id === action.userId ? {
                    ...user,
                    followed: true,
                } : user)
            }
        }
        case 'USERS/UNFOLLOW': {
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
        case 'USERS/SET_USERS': {
            return {
                ...state,
                users: action.users
            }
        }
        case 'USERS/SET_TOTAL_USERS_COUNT': {
            return {
                ...state,
                totalUsersCount: action.count
            }
        }
        case 'USERS/SET_CURRENT_PAGE': {
            return {
                ...state,
                currentPage: action.currentPage
            }
        }
        case 'USERS/TOGGLE_IS_FETCHING': {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }
        case 'USERS/TOGGLE_IS_FOLLOWING_PROGRESS': {
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


// ----------- actions -----------


type FollowSuccessActionType = ReturnType<typeof followSuccess>
type UnfollowSuccessActionType = ReturnType<typeof unfollowSuccess>
type SetUsersActionType = ReturnType<typeof setUsers>
type SetTotalUsersCountActionType = ReturnType<typeof setTotalUsersCount>
type SetCurrentPageActionType = ReturnType<typeof setCurrentPage>
type ToggleIsFetchingActionType = ReturnType<typeof toggleIsFetching>
type ToggleIsFollowingProgressActionType = ReturnType<typeof toggleIsFollowingProgress>

export const followSuccess = (userId: number) => {
    return {
        type: 'USERS/FOLLOW',
        userId: userId
    } as const
}
export const unfollowSuccess = (userId: number) => {
    return {
        type: 'USERS/UNFOLLOW',
        userId: userId
    } as const
}
export const setUsers = (users: Array<UserType>) => {
    return {
        type: 'USERS/SET_USERS',
        users
    } as const
}
export const setTotalUsersCount = (count: number) => {
    return {
        type: 'USERS/SET_TOTAL_USERS_COUNT',
        count
    } as const
}
export const setCurrentPage = (page: number) => {
    return {
        type: 'USERS/SET_CURRENT_PAGE',
        currentPage: page
    } as const
}
export const toggleIsFetching = (isFetching: boolean) => ({type: 'USERS/TOGGLE_IS_FETCHING', isFetching}) as const
export const toggleIsFollowingProgress = (userId: number, isFetching: boolean) => ({
    type: 'USERS/TOGGLE_IS_FOLLOWING_PROGRESS',
    userId,
    isFetching
}) as const


// ----------- Thunk -----------


type ThunkType = ThunkAction<void, AppStateType, unknown, UsersReducerActionType>
type ThunkDispatchActionType = ThunkDispatch<AppStateType, unknown, UsersReducerActionType>

export const getUsers = (currentPage: number, pageSize: number): ThunkType => (dispatch: ThunkDispatchActionType) => {
    dispatch(toggleIsFetching(true))
    usersAPI.getUsers(currentPage, pageSize)
        .then(data => {
            dispatch(setUsers(data.data.items))
            dispatch(setTotalUsersCount(data.data.totalCount))
            dispatch(toggleIsFetching(false))
        })
}
export const follow = (userId: number): ThunkType => (dispatch: ThunkDispatchActionType) => {
    dispatch(toggleIsFollowingProgress(userId, true))
    usersAPI.follow(userId).then(data => {
        if (data.data.resultCode === ResultCodeType.success) {
            dispatch(followSuccess(userId))
        }
        dispatch(toggleIsFollowingProgress(userId, false))
    })
}
export const unfollow = (userId: number): ThunkType => (dispatch: ThunkDispatchActionType) => {
    dispatch(toggleIsFollowingProgress(userId, true))
    usersAPI.unfollow(userId).then(data => {
        if (data.data.resultCode === ResultCodeType.success) {
            dispatch(unfollowSuccess(userId))
        }
        dispatch(toggleIsFollowingProgress(userId, false))
    })
}
