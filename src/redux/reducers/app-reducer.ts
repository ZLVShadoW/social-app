import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import { getAuthUserData } from './auth-reducer';
import {AppStateType} from './index';

type AppType = {
    isInitialized: boolean
}

const initialState: AppType = {
    isInitialized: false
}

type AppReducerActionsType = SetIsInitialized

export const appReducer = (state: AppType = initialState, action: AppReducerActionsType): AppType => {
    switch (action.type) {
        case 'APP/SET_IS_INITIALIZED': {
            return {
                ...state,
                isInitialized: action.isInit
            }
        }
        default: return state
    }
}


// ----------- actions -----------


export type SetIsInitialized = ReturnType<typeof setIsInitialized>

export const setIsInitialized = (isInit: boolean) => ({type: 'APP/SET_IS_INITIALIZED', isInit} as const)


// ----------- thunks -----------


type ThunkType = ThunkAction<void, AppStateType, unknown, AppReducerActionsType>
type ThunkDispatchActionType = ThunkDispatch<AppStateType, unknown, AppReducerActionsType>

export const initializeApp = (): ThunkType => (dispatch: ThunkDispatchActionType) => {
    dispatch(getAuthUserData()).then(() => {
        dispatch(setIsInitialized(true))
    })
}