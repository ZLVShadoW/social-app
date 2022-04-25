import React from 'react';
import cn from './Dialogs.module.scss'
import {Message} from './Message/Message';
import {DialogItem} from './DialogItem/DialogItem';
import {DialogType, MessageType} from '../../redux/reducers/dialogs-reducer';


type DialogsPropsType = {
    addMessage: () => void;
    updateNewMessageText: (value: string) => void;
    dialogs: Array<DialogType>;
    messages: Array<MessageType>;
    newMessageText: string;
}

export const Dialogs: React.FC<DialogsPropsType> = (props) => {

    const handlerTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        props.updateNewMessageText(e.currentTarget.value)
    }
    const addMessage = () => {
        props.addMessage()
    }

    const dialogsEl = props.dialogs.map(dialog => <DialogItem key={dialog.id} {...dialog} />)
    const messagesEl = props.messages.map(message => <Message key={message.id} message={message.message}/>)

    return (
        <div className={cn.dialogs}>
            <div className={cn.dialogs__users}>
                <ul>
                    {dialogsEl}
                </ul>
            </div>
            <div className={cn.dialogs__messages}>
                <div>{messagesEl}</div>
                <div>
                    <textarea
                        value={props.newMessageText}
                        onChange={handlerTextareaChange}
                        placeholder={'Add your message'}/>
                    <button onClick={addMessage}>Send</button>
                </div>
            </div>
        </div>
    );
}