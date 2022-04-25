import {combineReducers} from 'redux';
import profileReducer from './profile-reducer';
import dialogsReducer from './dialogs-reducer';
import usersReducer from './users-reducer';
import {setAuthReducer} from './auth-reducer';

// типизация самого стейта
export type AppStateType = ReturnType<typeof rootReducer>

export const rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    auth: setAuthReducer,
})


// --- docs. in store.ts file
// export type RootStateType = ReturnType<typeof store.getState>
// export type AppDispatch = typeof store.dispatch


