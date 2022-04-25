import React from 'react';
import {NavLink} from "react-router-dom";

type DialogItemPropsType = {
    name: string;
    id: number
}

export const DialogItem: React.FC<DialogItemPropsType> = ({id, name}) => {
    // const path = `/dialogs/${id}`
    const path = `${id}`

    return (
        <li><NavLink to={path}>{name}</NavLink></li>
    );
}