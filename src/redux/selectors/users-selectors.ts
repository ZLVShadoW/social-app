import {AppStateType} from '../reducers';
import {createSelector} from 'reselect';

const getUsersSel = (state: AppStateType) => {
    return state.usersPage.users
}
//выдуманная операция заместо сложной, вызывающая перерисовку. reselect стопает вызов/перерасчёт
export const getUsers = createSelector(getUsersSel, (users) => users.filter(el => el))

export const getTotalUsersCount = (state: AppStateType) => {
    return state.usersPage.totalUsersCount
}
export const getPageSize = (state: AppStateType) => {
    return state.usersPage.pageSize
}
export const getCurrentPage = (state: AppStateType) => {
    return state.usersPage.currentPage
}
export const getIsFetching = (state: AppStateType) => {
    return state.usersPage.isFetching
}
export const getFollowingProgress = (state: AppStateType) => {
    return state.usersPage.followingProgress
}