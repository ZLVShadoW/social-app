import {getAuthUserData} from './auth-reducer';
import {AppDispatchActionType, AppThunksType} from './actions-types';

type AppType = {
    isInitialized: boolean
}

const initialState: AppType = {
    isInitialized: false
}


export const appReducer = (state: AppType = initialState, action: AppReducerActionsType): AppType => {
    switch (action.type) {
        case 'APP/SET_IS_INITIALIZED': {
            return {
                ...state,
                isInitialized: action.isInit
            }
        }
        default:
            return state
    }
}


// ----------- actions -----------

export type AppReducerActionsType = SetIsInitialized

export type SetIsInitialized = ReturnType<typeof setIsInitialized>

export const setIsInitialized = (isInit: boolean) => ({type: 'APP/SET_IS_INITIALIZED', isInit} as const)


// ----------- thunks -----------

export const initializeApp = (): AppThunksType => (dispatch: AppDispatchActionType) => {
    const promise = dispatch(getAuthUserData())
    Promise.all([promise])
        .then(() => {
            dispatch(setIsInitialized(true))
        })
}