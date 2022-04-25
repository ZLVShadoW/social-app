import {ActionsType} from './actions-types';


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
                //TODO --- почему возможен возврат несуществующего св-ва
                users: state.users.map(user => user.id === action.userId ? {
                    ...user,
                    followed: true,
                    // something: 'pop-111'
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
                            // something2: 'pop-222'
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

export const follow = (userId: number) => {
    return {
        type: 'FOLLOW',
        userId: userId
    } as const
}
export const unfollow = (userId: number) => {
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

export default usersReducer;