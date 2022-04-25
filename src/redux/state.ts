// // import profileReducer, {addPostAC} from './profile-reducer';
// // import dialogsReducer, {addMessageAC, updateNewMessageTextAC} from './dialogs-reducer';
// // import {followAC, setUsersAC, unfollowAC} from './reducers/users-reducer';
//
//  type PostType = {
//     id: number;
//     message: string;
//     likesCount: number;
// }
//  type ProfilePageType = {
//     posts: Array<PostType>;
// }
//
//  type DialogType = {
//     id: number;
//     name: string;
// }
//  type MessageType = {
//     id: number;
//     message: string;
// }
//  type DialogsPageType = {
//     dialogs: Array<DialogType>;
//     messages: Array<MessageType>;
//     newMessageText: string;
// }
//
//  type RootStateType = {
//     profilePage: ProfilePageType;
//     dialogsPage: DialogsPageType;
// }
//
//  type StoreStateType = {
//     _state: RootStateType;
//     _rerender: (state: RootStateType) => void;
//     getState: () => RootStateType
//     // addPost: (postMessage: string) => void;
//     subscribe: (observer: (state: RootStateType) => void) => void;
//     dispatch: (action: ActionsType) => void
// }
//
//  type ActionsType = ReturnType<typeof addPostAC>
//     | ReturnType<typeof updateNewMessageTextAC>
//     | ReturnType<typeof addMessageAC>
//     | ReturnType<typeof followAC>
//     | ReturnType<typeof unfollowAC>
//     | ReturnType<typeof setUsersAC>
//
//  const store: StoreStateType = {
//     _state: {
//         profilePage: {
//             posts: [
//                 {id: 1, message: 'first text', likesCount: 3},
//                 {
//                     id: 2,
//                     message: 'second much more biggest text, which was written by the person/user likes to write such messages very much. And we need to check how it will be rendered in the browser window. That is why I continue to enter text more and more. And now COPY PASTE second much more biggest text, which was written by the person/user likes to write such messages very much. And we need to check how it will be rendered in the browser window. That is why I continue to enter text more and more',
//                     likesCount: 5
//                 },
//                 {id: 3, message: 'third text written by introvert :)))', likesCount: 1}
//             ]
//         },
//         dialogsPage: {
//             dialogs: [
//                 {id: 1, name: 'Leo'},
//                 {id: 2, name: 'Serg'},
//                 {id: 3, name: 'Nick'},
//                 {id: 4, name: 'Diman'},
//                 {id: 5, name: 'Max'}
//             ],
//             messages: [
//                 {id: 1, message: 'Lorem ipsum dolor'},
//                 {id: 2, message: 'second message is a little biggest'},
//                 {id: 3, message: 'this is third message from yur friend'},
//                 {id: 4, message: 'Lorem ipsum dolor it`s ok'},
//                 {
//                     id: 5,
//                     message: 'and one more message lorem ipsum dolor it`s ok. here lorem is not work, so ... bla-bla-bla sg f gdf df gdfgxg d d dfj gdkfj gdk gkd jgkd jdk fkdj kdj k'
//                 }
//             ],
//             newMessageText: ''
//         }
//     },
//     _rerender(state) {
//         console.log('state changed', state)
//     },
//     getState() {
//         return this._state
//     },
//     subscribe(observer) {
//         this._rerender = observer
//     },
//     dispatch(action) {
//         profileReducer(this._state.profilePage, action)
//         dialogsReducer(this._state.dialogsPage, action)
//
//         this._rerender(this._state)
//     }
// }
//
// //------- ActionCreators ------------
//
// // export type AddPostActionType = {
// //     type: 'ADD-POST';
// //     postMessage: string
// // }
// // export const addPostAC = (message: string): AddPostActionType => {
// //     return {type: 'ADD-POST', postMessage: message}
// // }
//
export let a = 1
