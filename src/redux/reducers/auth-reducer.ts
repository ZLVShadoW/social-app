import {ActionsType} from './actions-types';
import {authAPI} from '../../api/api';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {AppStateType} from './index';

type AuthType = {
  id: number | null
  login: string | null
  email: string | null
  isAuth: boolean
}

let initialState: AuthType = {
  id: null,
  login: null,
  email: null,
  //TODO ЗАМЕНИТЬ НА FALSE
  isAuth: false
}

export const setAuthReducer = (state = initialState, action: ActionsType): AuthType => {
  switch (action.type) {
    case 'SET_AUTH_USER_DATA': {
      return {
        ...state,
        ...action.payload,
        isAuth: true
      }
    }
    default:
      return state
  }
}

export const setAuthUserData = (id: number, login: string, email: string) => ({type: 'SET_AUTH_USER_DATA', payload: {id, login, email}} as const)

// ------------- Thunk ----------

type ThunkType = ThunkAction<void, AppStateType, unknown, ActionsType>
type ThunkDispatchActionType = ThunkDispatch<AppStateType, unknown, ActionsType>

export const getAuthUserData = (): ThunkType => (dispatch: ThunkDispatchActionType) => {
  authAPI.me()
      .then(res => {
        if (res.data.resultCode === 0) {
          const {id, login, email} = res.data.data
          dispatch(setAuthUserData(id, login, email))
        }
      })
}