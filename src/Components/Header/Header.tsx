import React from 'react';
import cn from './Header.module.scss';
import {Link} from 'react-router-dom';

type HeaderType = {
    login: string | null
    isAuth: boolean
}

export const Header: React.FC<HeaderType> = ({isAuth, login}) => {
    return (
        <header className={cn.header}>
            <div className={'container'}>
                <div>header</div>
                <div>
                    {
                        isAuth ? `hi, ${login}` : <Link to={'/auth'}>Login</Link>
                    }
                </div>
            </div>
        </header>
    )
}