import {getAuthUserData} from './auth-reducer';
import {AppDispatchActionType, AppThunksType} from './actions-types';

// type InitialStateAppType = {
//     isInitialized: boolean
// }

const initialState = {
    isInitialized: false
}

export const appReducer = (
    state: InitialStateAppType = initialState,
    action: AppReducerActionsType
): InitialStateAppType => {
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

// export const setIsInitialized = (isInit: boolean) => ({
//     type: 'APP/SET_IS_INITIALIZED',
//     isInit
// } as const)

const actions = {
    setIsInitialized: (isInit: boolean) => ({
        type: 'APP/SET_IS_INITIALIZED',
        isInit
    } as const)
}


// ----------- thunks -----------

export const initializeApp = (): AppThunksType => (dispatch: AppDispatchActionType) => {
    const promise = dispatch(getAuthUserData())
    Promise.all([promise])
        .then(() => {
            dispatch(actions.setIsInitialized(true))
        })
}


// ----------- type -----------

export type InitialStateAppType = typeof initialState

// export type AppReducerActionsType = SetIsInitialized
// export type SetIsInitialized = ReturnType<typeof setIsInitialized>

export type AppReducerActionsType = InferActionsTypes<typeof actions>

type PropertiesTypes<T> = T extends { [key: string]: infer U } ? U : never
type InferActionsTypes<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<PropertiesTypes<T>>