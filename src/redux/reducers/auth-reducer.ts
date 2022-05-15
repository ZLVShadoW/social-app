import {authAPI, ResultCodeType} from '../../api/api';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {AppStateType} from './index';

export type AuthType = {
    id: number | null
    login: string | null
    email: string | null
    isAuth: boolean
    authError: string | null
}

let initialState: AuthType = {
    id: null,
    login: null,
    email: null,
    //TODO ЗАМЕНИТЬ НА FALSE
    isAuth: false,
    authError: null
}

type AuthReducerActionsType = SetAuthUserDataActionType
    | SetAuthError

const authReducer = (state = initialState, action: AuthReducerActionsType): AuthType => {
    switch (action.type) {
        case 'AUTH/SET_AUTH_USER_DATA': {
            return {
                ...state,
                ...action.payload
            }
        }
        case 'AUTH/SET_AUTH_ERROR': {
            return {
                ...state,
                authError: action.err
            }
        }
        default:
            return state
    }
}
export default authReducer;

// ----------- Action -----------


type SetAuthUserDataActionType = ReturnType<typeof setAuthUserData>
type SetAuthError = ReturnType<typeof setAuthError>

export const setAuthUserData = (id: number | null, login: string | null, email: string | null, isAuth: boolean) =>
    ({type: 'AUTH/SET_AUTH_USER_DATA', payload: {id, login, email, isAuth}} as const)
export const setAuthError = (err: string | null) => ({type: 'AUTH/SET_AUTH_ERROR', err} as const)


// ----------- Thunk -----------


type ThunkType = ThunkAction<void, AppStateType, unknown, AuthReducerActionsType>
type ThunkDispatchActionType = ThunkDispatch<AppStateType, unknown, AuthReducerActionsType>

export const getAuthUserData = (): any => (dispatch: ThunkDispatchActionType) => {
     return authAPI.me()
        .then(res => {
            if (res.data.resultCode === ResultCodeType.success) {
                const {id, login, email} = res.data.data
                dispatch(setAuthUserData(id, login, email, true))
            }
        })
}
export const login = (data: { email: string, password: string, rememberMe: boolean }): ThunkType =>
    (dispatch: ThunkDispatchActionType) => {
        const {email, password, rememberMe} = data
        authAPI.login(email, password, rememberMe)
            .then(res => {
                if (res.data.resultCode === ResultCodeType.success) {
                    dispatch(getAuthUserData())
                } else {
                    dispatch(setAuthError(res.data.messages[0]))
                }
            })
    }
export const logout = (): ThunkType => (dispatch: ThunkDispatchActionType) => {
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === ResultCodeType.success) {
                dispatch(setAuthUserData(null, null, null, false))
                dispatch(setAuthError(null))
            }
        })
}