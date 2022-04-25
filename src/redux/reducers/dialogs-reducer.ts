import {ActionsType} from './actions-types';


export type DialogType = {
    id: number;
    name: string;
}
export type MessageType = {
    id: number;
    message: string;
}
export type DialogsPageType = {
    dialogs: Array<DialogType>;
    messages: Array<MessageType>;
    newMessageText: string;
}

let initialState: DialogsPageType = {
    dialogs: [
        {id: 1, name: 'Leo'},
        {id: 2, name: 'Serg'},
        {id: 3, name: 'Nick'},
        {id: 4, name: 'Diman'},
        {id: 5, name: 'Max'}
    ],
    messages: [
        {id: 1, message: 'Lorem ipsum dolor'},
        {id: 2, message: 'second message is a little biggest'},
        {id: 3, message: 'this is third message from yur friend'},
        {id: 4, message: 'Lorem ipsum dolor it`s ok'},
        {
            id: 5,
            message: 'and one more message lorem ipsum dolor it`s ok. here lorem is not work, so ... bla-bla-bla sg f gdf df gdfgxg d d dfj gdkfj gdk gkd jgkd jdk fkdj kdj k'
        }
    ],
    newMessageText: ''
}

const dialogsReducer = (state = initialState, action: ActionsType): DialogsPageType => {
    switch (action.type) {
        case 'UPDATE-NEW-MESSAGE-TEXT': {
            return {
                ...state,
                newMessageText: action.newMessageText
            }
        }
        case 'ADD-MESSAGE': {
            let newTxt = state.newMessageText.trim()
            if (newTxt) {
                let newMessage: MessageType = {
                    id: 7,
                    message: newTxt
                }
                return {
                    ...state,
                    newMessageText: '',
                    messages: [...state.messages, newMessage]
                }
            } else return {
                ...state,
                newMessageText: ''
            }

        }
        default:
            return state
    }
}

export default dialogsReducer;


export const updateNewMessageTextAC = (message: string) => {
    return {type: 'UPDATE-NEW-MESSAGE-TEXT', newMessageText: message} as const
}
export const addMessageAC = () => ({type: 'ADD-MESSAGE'} as const)