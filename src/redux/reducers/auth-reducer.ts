import {ActionsType} from './actions-types';

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