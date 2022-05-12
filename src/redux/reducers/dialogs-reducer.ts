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
    ]
}

type DialogsReducerActionsType = AddMessageActionType

const dialogsReducer = (state = initialState, action: DialogsReducerActionsType): DialogsPageType => {
    switch (action.type) {
        case 'ADD-MESSAGE': {
            let newMessage: MessageType = {
                id: 7,
                message: action.messageText
            }
            return {
                ...state,
                messages: [...state.messages, newMessage]
            }
        }
        default:
            return state
    }
}

export default dialogsReducer;


// ----------- actions -----------


type AddMessageActionType = ReturnType<typeof addMessageAC>

export const addMessageAC = (messageText: string) => ({type: 'ADD-MESSAGE', messageText} as const)