import {addPostAC, setStatus, setUserProfile} from './profile-reducer';
import {addMessageAC} from './dialogs-reducer';
import {
    followSuccess,
    setCurrentPage,
    setTotalUsersCount,
    setUsers,
    toggleIsFetching, toggleIsFollowingProgress,
    unfollowSuccess
} from './users-reducer';
import {setAuthUserData} from './auth-reducer';

export type ActionsType = ReturnType<typeof addPostAC>
    | ReturnType<typeof addMessageAC>
    | ReturnType<typeof followSuccess>
    | ReturnType<typeof unfollowSuccess>
    | ReturnType<typeof setUsers>
    | ReturnType<typeof setTotalUsersCount>
    | ReturnType<typeof setCurrentPage>
    | ReturnType<typeof toggleIsFetching>
    | ReturnType<typeof setUserProfile>
    | ReturnType<typeof setAuthUserData>
    | ReturnType<typeof toggleIsFollowingProgress>
    | ReturnType<typeof setStatus>