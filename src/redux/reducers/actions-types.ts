import {AppReducerActionsType} from './app-reducer';
import {AuthReducerActionsType} from './auth-reducer';
import {UsersReducerActionType} from './users-reducer';
import {ProfileReducerActionsType} from './profile-reducer';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {AppStateType} from './index';
import {DialogsReducerActionsType} from './dialogs-reducer';

export type AppActionsType = AuthReducerActionsType | UsersReducerActionType
    | AppReducerActionsType | ProfileReducerActionsType | DialogsReducerActionsType

export type AppThunksType<ReturnType = void> = ThunkAction<ReturnType, AppStateType, unknown, AppActionsType>
export type AppDispatchActionType = ThunkDispatch<AppStateType, unknown, AppActionsType>