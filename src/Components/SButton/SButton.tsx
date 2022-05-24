import React from 'react';
import cn from './SButton.module.scss'

type SButtonPropsType =  React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {

}

export const SButton: React.FC<SButtonPropsType> = ({children, ...rest}) => {
    return (
        <button className={cn.btn} {...rest}>{children}</button>
    )
}