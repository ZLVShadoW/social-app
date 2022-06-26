import {ResultCodeType} from '../../api/api';
import {AppDispatchActionType, AppThunksType} from './actions-types';
import {authAPI} from '../../api/auth-api';
import {securityAPI} from '../../api/security-api';
import { Nullable } from '../../types';

export type AuthType = {
    id: number | null
    login: string | null
    email: string | null
    isAuth: boolean
    authError: Nullable<string>
    captchaUrl?: Nullable<string>
}

let initialState: AuthType = {
    id: null,
    login: null,
    email: null,
    isAuth: false,
    authError: null,
    captchaUrl: null
}


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
        case 'AUTH/SET_CAPTCHA_URL': {
            return {
                ...state,
                captchaUrl: action.captchaUrl
            }
        }
        default:
            return state
    }
}
export default authReducer;


// ----------- Action -----------

export type AuthReducerActionsType = SetAuthUserDataActionType
    | SetAuthError
    | SetCaptchaUrl

type SetAuthUserDataActionType = ReturnType<typeof setAuthUserData>
type SetAuthError = ReturnType<typeof setAuthError>
type SetCaptchaUrl = ReturnType<typeof setCaptchaUrl>

export const setAuthUserData = (id: number | null, login: string | null, email: string | null, isAuth: boolean) =>
    ({type: 'AUTH/SET_AUTH_USER_DATA', payload: {id, login, email, isAuth}} as const)

export const setAuthError = (err: string | null) => ({type: 'AUTH/SET_AUTH_ERROR', err} as const)

export const setCaptchaUrl = (captchaUrl: string) => ({type: 'AUTH/SET_CAPTCHA_URL', captchaUrl} as const)


// ----------- Thunk -----------

//ThunkAction<Promise<boolean | void>, AppStateType, unknown, AuthReducerActionsType> на 63 строке заменить
export const getAuthUserData = (): AppThunksType => async (dispatch: AppDispatchActionType) => {
    const res = await authAPI.me()

    if (res.data.resultCode === ResultCodeType.success) {
        const {id, login, email} = res.data.data
        dispatch(setAuthUserData(id, login, email, true))
    }
}

export const login = (data: { email: string, password: string, rememberMe: boolean, captcha: Nullable<string> }): AppThunksType =>
    async (dispatch: AppDispatchActionType) => {
        const {email, password, rememberMe, captcha} = data

        const res = await authAPI.login(email, password, rememberMe, captcha)

        if (res.data.resultCode === ResultCodeType.success) {
            dispatch(getAuthUserData())
        } else {
            if (res.data.resultCode === ResultCodeType.captcha) {
               await dispatch(getCaptchaUrl())
            }
            dispatch(setAuthError(res.data.messages[0]))
        }
    }

export const logout = (): AppThunksType => async (dispatch: AppDispatchActionType) => {
    const res = await authAPI.logout()

    if (res.data.resultCode === ResultCodeType.success) {
        dispatch(setAuthUserData(null, null, null, false))
        dispatch(setAuthError(null))
    }
}

export const getCaptchaUrl = () => async (dispatch: AppDispatchActionType) => {
    const res = await securityAPI.getCaptcha()
    dispatch(setCaptchaUrl(res.data.url))
}