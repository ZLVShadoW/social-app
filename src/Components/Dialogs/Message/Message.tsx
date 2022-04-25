import React from 'react';
import cn from './Message.module.scss';

type MessagePropsType = {
    message: string;
}

export const Message: React.FC<MessagePropsType> = ({message}) => {
    return (
        <div className={cn.message}>{message}</div>
    );
}