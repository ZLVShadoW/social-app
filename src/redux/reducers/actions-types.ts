import {addPostAC, setUserProfile} from './profile-reducer';
import {addMessageAC, updateNewMessageTextAC} from './dialogs-reducer';
import {
    follow,
    setCurrentPage,
    setTotalUsersCount,
    setUsers,
    toggleIsFetching, toggleIsFollowingProgress,
    unfollow
} from './users-reducer';
import {setAuthUserData} from './auth-reducer';

export type ActionsType = ReturnType<typeof addPostAC>
    | ReturnType<typeof updateNewMessageTextAC>
    | ReturnType<typeof addMessageAC>
    | ReturnType<typeof follow>
    | ReturnType<typeof unfollow>
    | ReturnType<typeof setUsers>
    | ReturnType<typeof setTotalUsersCount>
    | ReturnType<typeof setCurrentPage>
    | ReturnType<typeof toggleIsFetching>
    | ReturnType<typeof setUserProfile>
    | ReturnType<typeof setAuthUserData>
    | ReturnType<typeof toggleIsFollowingProgress>