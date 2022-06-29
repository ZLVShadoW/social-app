import React from 'react';
import cn from './Dialogs.module.scss'
import {Message} from './Message/Message';
import {DialogItem} from './DialogItem/DialogItem';
import {DialogType, MessageType} from '../../redux/reducers/dialogs-reducer';
import {DialogFormTextarea} from './DialogFormTextarea';

type DialogsPropsType = {
    dialogs: Array<DialogType>;
    messages: Array<MessageType>;
    addMessage: () => void;
}

export const Dialogs: React.FC<DialogsPropsType> = ({dialogs, messages, addMessage}) => {

    const dialogsEl = dialogs.map(dialog => <DialogItem key={dialog.id} {...dialog} />)
    const messagesEl = messages.map(message => <Message key={message.id} message={message.message}/>)

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

                    {/*//TODO вариант форму родителем сделать; дети (children) для сборки формы*/}
                    <DialogFormTextarea addMessage={addMessage} />
                </div>
            </div>
        </div>
    );
}